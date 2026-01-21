from enum import Enum
import sys
from time import sleep
from typing import Tuple

import requests
from bs4 import BeautifulSoup

from utils import *
from database import *
from Entities import *
import doctest

# The number of stickers with unknown titles to allow before aborting the scrape and throwing an error. 
# Set to -1 to disable.
MAX_UNKNOWN_TITLE_STICKERS_ABORT = -1;

# The max number of stickers with unknown titles for the scrape to be considered to be successful. High amounts of unknown titles indicates that the set has not added complete data yet.
MAX_UNKNOWN_TITLE_STICKERS_SUCCESSFUL = 3

# In hindsight, I don't think this is going to scale well
class ScrapeResult(Enum):
    SUCCESS = 0
    FAILURE_NO_DATA = 1
    FAILURE = 2
    FAILURE_TOO_MANY_MISSING_TITLES = 3
    SUCCESS_MISSING_TITLES = 4

    @property
    def is_failure(self):
        return self in {
            ScrapeResult.FAILURE,
            ScrapeResult.FAILURE_NO_DATA,
            ScrapeResult.FAILURE_TOO_MANY_MISSING_TITLES,
        }
    
    @property
    def is_success(self):
        return self in {
            ScrapeResult.SUCCESS,
            ScrapeResult.SUCCESS_MISSING_TITLES,
        }

def scrape_sticker_set(set_name: str) -> ScrapeResult:
    """
    Scrapes all of the sticker data for the given paimon painting set. Returns False if the scraping was not successful (set does not exist, no stickers uploaded yet, too many unknown title stickers), True otherwise.
    """
    log(f"Attempting to scrape sticker set Set {set_name}...")
    target_url = get_sticker_set_url(set_name)
    response = requests.get(target_url)
    soup = BeautifulSoup(response.text, "html.parser")
    num_unknown_title_stickers = 0

    # Check if article exists
    if soup.find("div", class_="noarticletext") is not None:
        log(f"Set {set_name} does not exist.")
        return ScrapeResult.FAILURE_NO_DATA
    
    # Check if sticker gallery exists and has stickers
    gallery = soup.find("div", id="gallery-0")
    if gallery is None:
        log(f"Set {set_name} does not exist.")
        return ScrapeResult.FAILURE_NO_DATA
    
    cells = gallery.find_all("div", class_="wikia-gallery-item")
    if len(cells) == 0 or gallery.find("div", id="No_images_match_the_selection_criteria-") is not None:
        log(f"Set {set_name} appears to exist but no stickers were uploaded yet.")
        return ScrapeResult.FAILURE_NO_DATA

    # Handle sticker set access/creationg
    sticker_set = get_sticker_set_by_name(set_name)
    if sticker_set is None:
        # Create a sticker set entry. Main sticker/release dates will be added after scraping stickers.
        log(f"Set {set_name} not found in database, creating new entry...")
        sticker_set = StickerSet(
            name=set_name,
        )
        sticker_set_id = create_sticker_set(sticker_set)
        sticker_set.id = sticker_set_id

    assert sticker_set.id is not None

    # Scrape stickers
    for cell in cells:
        image = cell.find("img")
        assert image is not None
        image_source_original = extract_sticker_original_image_url(str(image["src"]))

        cell_caption = cell.find("div", class_="lightbox-caption")
       
        assert cell_caption is not None
        character, title = _extract_character_and_title(cell_caption)


        # Empty Title check
        if title == "Unknown":
            num_unknown_title_stickers += 1

            # Abort if enough stickers have no titles, if set (pun intended)
            if MAX_UNKNOWN_TITLE_STICKERS_ABORT != -1:
                log(f"WARN: {num_unknown_title_stickers} out of max {MAX_UNKNOWN_TITLE_STICKERS_ABORT} allowed unknown sticker titles encountered.")
                if num_unknown_title_stickers > MAX_UNKNOWN_TITLE_STICKERS_ABORT:
                    log(f"Exceeded maximum unknown title stickers for set {set_name}, aborting scrape.")
                    return ScrapeResult.FAILURE_TOO_MANY_MISSING_TITLES
        

        filename = extract_filename(image_source_original)
        sticker = Sticker(
            title=title,
            character=character,
            image_url_source=image_source_original,
            set_name=set_name,
            set_id=sticker_set.id,
            filename=filename
        )
        # download sticker
        filepath, cached = download_sticker(sticker)
        sticker.filepath = filepath

        sticker, character = _update_sticker_db(sticker)
        log(f"Processed '{sticker.full_title}' (ID {sticker.id}) | {character.name} (ID {character.id}) | cached: {cached}")

        if not cached:
            sleep(1)
    
    # Scrape some set data
    if sticker_set.main_sticker_id is None:
        # Attempt to get main sticker
        log(f"Set {set_name} has no main sticker, attempting to get...")
        sticker_set_main_sticker_id = _get_sticker_set_main_sticker_id(set_name)
        sticker_set.main_sticker_id = sticker_set_main_sticker_id
    if sticker_set.release_date is None:
        # Attempt to get release date
        log(f"Set {set_name} has no release date, attempting to get...")
        release_date = _get_set_release_date(soup)
        sticker_set.release_date = release_date
    
    update_sticker_set(sticker_set)

    log(f"Finished scraping sticker set {set_name}.")
    if num_unknown_title_stickers > MAX_UNKNOWN_TITLE_STICKERS_SUCCESSFUL:
        log(f"WARN: Set {set_name} had {num_unknown_title_stickers} stickers with unknown titles. Scrape is only partially successful, likely due to incomplete source data. Will not be marked as latest set.")
        return ScrapeResult.SUCCESS_MISSING_TITLES
    return ScrapeResult.SUCCESS


def _get_set_release_date(soup: BeautifulSoup) -> str | None:
    release_date_section = soup.find(lambda tag: tag.name == "section" and tag.find("th", class_="pi-data-label", string="Release Date") is not None)
    
    if release_date_section is None:
        log(f"WARN: Failed to get release date: No section")
        return None
    release_date_box = release_date_section.find("td", class_="pi-data-value")
    if release_date_box is None:
        log(f"WARN: Failed to get release date: No data value")
        return None
    
    release_date = release_date_box.find(string=True, recursive=False)
    # release date is like January 1, 2026 format.
    assert release_date is not None
    release_date_iso = to_iso_date(release_date.strip())
    log(f"Set release date is {release_date_iso}")
    return release_date_iso


def _get_sticker_set_main_sticker_id(set_name: str) -> int | None:
    """
    Returns the main sticker ID for the given sticker set, if one is assigned.
    """
    url = "https://genshin-impact.fandom.com/wiki/Paimon%27s_Paintings/Sets"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    image = soup.find("img", alt=f"Set {set_name}")
    if image is None:
        log(f"WARN: Failed to get main sticker for Set {set_name}: Could not find image")
        return None

    image_source_url = str(image["src"])
    image_source_url_clean = extract_sticker_original_image_url(image_source_url)

    if (image_source_is_unknown_image(image_source_url_clean)):
        log(f"Set {set_name} has no main sticker assigned.")
        return None
    
    sticker = get_sticker_by_source_url(image_source_url_clean)
    if sticker is None:
        log(f"WARN: Failed to get main sticker for Set {set_name}: Could not find sticker in database")
        return None
    
    log(f"Set {set_name} main sticker is {sticker.full_title} (ID {sticker.id})")
    return sticker.id


def _update_sticker_db(sticker: Sticker) -> Tuple[Sticker, Character]: 
    """
    Handles updating the database with the sticker. The sticker object lacks its id and character_id before this function is called.
    """
    # Check if this is first-time character
    first_time_character = not character_exists_by_name(sticker.character)
    character = Character(name=sticker.character)
    character_id = create_character(character)
    character.id = character_id

    # Set up sticker foreign key
    sticker.character_id = character_id
    sticker_id = create_sticker(sticker)

    saved_sticker = get_sticker_by_id(sticker_id)
    sticker.id = sticker_id

    # TODO: Should eventually stop using full_title and construct via database character name and title only.
    # Quick check if the full sticker title was updated. Thanks Columbina.
    assert saved_sticker is not None
    if (saved_sticker.full_title != sticker.full_title):
        log(f"WARN: Sticker title mismatch: '{sticker.full_title}' (current) vs '{saved_sticker.full_title}' (saved). Using current title.")
        update_sticker(sticker)

    # sticker now has all data

    # If first time character, set main sticker as given sticker
    if first_time_character:
        character.main_sticker_id = sticker_id
        update_character(character)
        log(f"New character: {character.name}")
    
    # now character has all data
    return sticker, character

def scrape_until_no_new_sets() -> None:
    """
    runs the scraper on all numbered sets until it encounters failure
    """
    current = 1

    try:
        while True:
            result = scrape_sticker_set(str(current))
            current += 1
            if result.is_failure:
                break
    except Exception as e:
        raise e
    finally:
        log(f"Processed sets 1 to {current - 1}.")

def scrape_latest_set() -> ScrapeResult:
    """
    Attempts to scrape the next numbered sticker set after latest set recorded. Returns the ScrapeResult of the attempt, and will increment latest set only if fully successful.
    """
    latest_set = get_latest_set()
    next_set = latest_set + 1
    try:
        result = scrape_sticker_set(str(next_set))
        # On a partial success, will need to re-scrape later on so do not update.
        if result == ScrapeResult.SUCCESS:
            update_latest_set(next_set)
        
        return result
    except Exception as e:
        raise e


def _extract_character_and_title(sticker_caption: BeautifulSoup) -> Tuple[str, str]:
    """
    Given sticker caption string, extracts and returns the character and title as a tuple.
    >>> from bs4 import BeautifulSoup
    >>> _extract_character_and_title(BeautifulSoup('<div><a>Ineffa</a>:\xa0ABC</div>', 'html.parser').find("div"))
    ('Ineffa', 'ABC')
    >>> _extract_character_and_title(BeautifulSoup('<div>Shake Hands</div>', 'html.parser').find("div"))
    [... ...] WARN: Sticker 'Shake Hands' missing character
    ('Unknown', 'Shake Hands')
    >>> _extract_character_and_title(BeautifulSoup('<div><a>C</a>:\xa0<span><span>A</span> "B"</span></div>', 'html.parser').find("div"))
    ('C', 'A "B"')
    >>> _extract_character_and_title(BeautifulSoup('<div><a>Paimon</a></div>', 'html.parser').find("div"))
    [... ...] WARN: Sticker 'Paimon' missing title
    ('Paimon', 'Unknown')
    """
    raw_text = sticker_caption.get_text()
    text_split = raw_text.split(":\xa0")
    anchor = sticker_caption.find("a")

    character_present = anchor is not None

    character = "Unknown"
    title = "Unknown"

    if character_present:
        # Know that character is going to be first in the text
        character = text_split[0].strip()
        if len(text_split) > 1:
            # A title is also provided.
            title = text_split[1].strip()
        else:
            log(f"WARN: Sticker '{raw_text}' missing title")
    else:
        # No character anchor, so only a title exists.
        log(f"WARN: Sticker '{raw_text}' missing character")
        title = raw_text.strip()


    return character,title

if __name__ == "__main__":
    # doctest.testmod(verbose=True, optionflags=doctest.ELLIPSIS)
    try:
        # scrape_until_no_new_sets()
        result = scrape_latest_set()
        match (result):
            case ScrapeResult.SUCCESS:
                log("New set scraped successfully.")
                sys.exit(0)
            case ScrapeResult.SUCCESS_MISSING_TITLES:
                log("New set scraped successfully, but with some missing titles.")
                sys.exit(0)
            case ScrapeResult.FAILURE_NO_DATA:
                log("New set was not found (no data).")
                sys.exit(1)
            case ScrapeResult.FAILURE_TOO_MANY_MISSING_TITLES:
                log("New set scrape aborted due to too many missing titles.")
                sys.exit(1)
            case ScrapeResult.FAILURE:
                log("New set scrape failed.")
                sys.exit(1)
    except Exception as e:
        log(f"ERROR: Aborting scrape: {e}")
        sys.exit(1)
        
