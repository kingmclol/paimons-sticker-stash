from time import sleep
from typing import Tuple

import requests
from bs4 import BeautifulSoup

from utils import log, get_sticker_set_url, download_sticker, get_latest_set, update_latest_set
from database import get_sticker_by_id, create_sticker, get_character_by_name, create_character, character_exists_by_name, update_character
from Entities import Sticker, Character


def scrape_sticker_set(set_number: int) -> bool:
    """
    Scrapes all of the sticker data for the given paimon painting set. Returns False if the set does not exist.
    """
    log(f"Attempting to scrape sticker set {set_number}...")
    target_url = get_sticker_set_url(set_number)
    response = requests.get(target_url)
    soup = BeautifulSoup(response.text, "html.parser")

    # Stickers are contained in a gallery div, and each cell contains a single sticker
    gallery = soup.find("div", id="gallery-0")
    if gallery is None:
        log(f"Set {set_number} does not exist.")
        return False
    cells = gallery.find_all("div", class_="wikia-gallery-item")

    if len(cells) == 0 or gallery.find("div", id="No_images_match_the_selection_criteria-") is not None:
        log(f"Set {set_number} appears to exist but no stickers were uploaded yet.")
        return False

    for cell in cells:
        image = cell.find("img")
        # Extracted URL is lowres of format
        # [WIKI_URL]/images/c/c0/[STICKER_NAME].png/revision/latest/scale-to-width-down/185?cb=20250915173336
        # Truncating after .png gets larger size
        image_source_original = image["src"].split("/revision")[0]

        cell_caption = cell.find("div", class_="lightbox-caption")
        # Captions are generally formatted as "Character:(nonbreaking space)Title"
        caption_split = cell_caption.get_text().split(":\xa0")
        # Split into ["Character", "Title"]

        if len(caption_split) != 2:
            # In some cases, a sticker has different naming scheme. Use "Unknown" as character
            character = "Unknown"
            title = caption_split[0]
            log(f"WARNING: Unexpected caption '{cell_caption.get_text()}' in set {set_number}, using 'Unknown' as character.")
        else:
            character = caption_split[0]
            title = caption_split[1]

        sticker = Sticker(
            title=title,
            character=character,
            image_url_source=image_source_original,
            set_number=set_number
        )
        # download sticker
        filepath, cached = download_sticker(sticker)
        sticker.filepath = filepath

        sticker, character = _update_database(sticker)
        log(f"Processed {sticker.full_title} (ID {sticker.id}) | {character.name} (ID {character.id}) | cached: {cached}")

        if not cached:
            sleep(0.5)

    log(f"Finished scraping sticker set {set_number}.")
    return True

def _update_database(sticker: Sticker) -> Tuple[Sticker, Character]: 
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
    sticker.id = sticker_id
    # sticker now has all data

    # If first time character, set main sticker as given sticker
    if first_time_character:
        character.main_sticker_id = sticker_id
        update_character(character)
        log(f"NEW CHARACTER: {character.name}")
    
    # now character has all data
    return sticker, character

def scrape_until_no_new_sets():
    """
    runs the scraper on all sets until it encounters failure
    """
    current = 1
    while scrape_sticker_set(current):
        current += 1
    
    log(f"Processed sets 1 to {current - 1}.")

def scrape_latest_set():
    """
    Attempts to scrape the next sticker set after latest set recorded
    """
    latest_set = get_latest_set()
    next_set = latest_set + 1
    try:
        if scrape_sticker_set(next_set):
            update_latest_set(next_set)
        else:
            log(f"No new set found.")
    except Exception as e:
        log(f"An unexpected error occurred while scraping set {next_set}: {e}")


if __name__ == "__main__":
    # scrape_sticker_set(39)
    scrape_until_no_new_sets()
    # scrape_latest_set()
