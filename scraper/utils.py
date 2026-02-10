"""
Utils
"""
import os
from typing import Tuple

import urllib.parse
import requests
import datetime
from Entities import Sticker
import doctest

# utils.py located in ROOT/scraper so going back two levels to get to ROOT
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ENDPOINT = "https://genshin-impact.fandom.com/api.php"

def download_sticker(sticker: Sticker) -> Tuple[str, bool]:
    """
    Downloads the sticker's image to the nextjs public/stickers directory. Returns a tuple with the filePATH (empty if failed)
    and whether it was a cached download (already in computer so skipped downloading from source).
    """
    log(f"Downloading '{sticker.full_title}' (set {sticker.set_name})...")
    os.makedirs(f"{PROJECT_ROOT}/public/stickers", exist_ok=True)  # Ensure the directory exists
    response = requests.get(sticker.image_url_source)
    if response.status_code == 200:
        os.makedirs(f"{PROJECT_ROOT}/public/stickers/set_{sticker.set_name}", exist_ok=True)  # Ensure the set directory exists
        if os.path.exists(f"{PROJECT_ROOT}/public/stickers/set_{sticker.set_name}/{sticker.filename}"):
            # If for some reason it already exists, skip.
            log(f"File {sticker.filename} already exists, skipping download.")
            return f"/stickers/set_{sticker.set_name}/{sticker.filename}", True

        with open(f"{PROJECT_ROOT}/public/stickers/set_{sticker.set_name}/{sticker.filename}", "wb") as f:
            f.write(response.content)
        log(f"Downloaded '{sticker.full_title}' as {sticker.filename}")
        return f"/stickers/set_{sticker.set_name}/{sticker.filename}", False
    else:
        log(f"Failed to download '{sticker.full_title}'")
        return "", False

def get_sticker_set_page_html(set_name: str) -> str:
    """
    Gets the HTML content of the sticker set page using the mediawiki api. Returns empty string if something went wrong.
    """
    params = {
        "action": "parse",
        "page": f"Paimon's_Paintings/Set_{set_name}",
        "format": "json",
    }
    response = requests.get(ENDPOINT, params=params)
    if response.status_code == 200:
        data = response.json();
        if "error" in data:
            log(f"Error fetching page HTML for set {set_name}: {data['error']['info']}")
            return ""
    
        return data["parse"]["text"]["*"]
    else:
        log(f"Failed to fetch page HTML for set {set_name}, recieved error {response.status_code}")
        return ""


def get_sticker_set_url(set_name: str) -> str:
    """
    Returns the target source URL for the sticker set given its set name
    >>> get_sticker_set_url("1")
    'https://genshin-impact.fandom.com/wiki/Paimon%27s_Paintings/Set_1'
    >>> get_sticker_set_url("Set Kiehl's")
    'https://genshin-impact.fandom.com/wiki/Paimon%27s_Paintings/Set_Set_Kiehl%27s'
    """
    set_name_encoded = encode_page_title(set_name)
    return f"https://genshin-impact.fandom.com/wiki/Paimon%27s_Paintings/Set_{set_name_encoded}"


def extract_sticker_original_image_url(image_url: str) -> str:
    """
    Given a sticker image URL from the wiki, returns the original image URL by truncating after .png
    >>> extract_sticker_original_image_url("https://genshin-impact.fandom.com/images/c/c0/Icon_Emoji_Paimon's_Paintings_43_Ineffa_2.png/revision/latest/scale-to-width-down/185?cb=20250915173336")
    "https://genshin-impact.fandom.com/images/c/c0/Icon_Emoji_Paimon's_Paintings_43_Ineffa_2.png"
    """
    return image_url.split("/revision")[0]


def extract_filename(image_url: str) -> str:
    """
    Given a image source URL, extracts the filename from it as a WEBP since apparently that's what I get from downloading the image.
    >>> extract_filename("https://static.wikia.nocookie.net/gensin-impact/images/0/01/Icon_Emoji_Paimon%27s_Paintings_01_Paimon_6.png")
    "Icon_Emoji_Paimon's_Paintings_01_Paimon_6.webp"
    >>> extract_filename("https://static.wikia.nocookie.net/gensin-impact/images/0/01/Icon_Emoji_Paimon%27s_Paintings_01_Paimon_6.png/revision/latest/scale-to-width-down/185?cb=20220912154045")
    "Icon_Emoji_Paimon's_Paintings_01_Paimon_6.webp"
    """
    img_original = extract_sticker_original_image_url(image_url)
    return urllib.parse.unquote(img_original.split("/")[-1].replace(".png", ".webp"))

def get_latest_set() -> int:
    """
    Returns the latest sticker set number from latest_set.txt
    """
    with open(f"{PROJECT_ROOT}/scraper/latest_set.txt", "r") as f:
        latest_set = int(f.read().strip())
    return latest_set


def update_latest_set(set_number: int):
    """
    Updates the latest sticker set number in latest_set.txt
    """
    with open(f"{PROJECT_ROOT}/scraper/latest_set.txt", "w") as f:
        f.write(str(set_number))


def image_source_is_unknown_image(image_source: str) -> bool:
    """
    Returns whether the image source URL indicates an unknown sticker
    """
    return "https://static.wikia.nocookie.net/gensin-impact/images/4/4a/Item_Unknown.png" in image_source


def log(content):
    """
    Log the content onto the console with timestamp
    """
    print(f"[{get_timestamp()}] {content}")


def get_timestamp() -> str:
    """
    Returns a formatted timestamp
    """
    return datetime.datetime.today().strftime('%Y-%m-%d %H:%M:%S')


def to_iso_date(date_str: str) -> str:
    """
    Converts a date string in format "Month Day, Year" to ISO format "YYYY-MM-DD"
    >>> to_iso_date("January 1, 2026")
    '2026-01-01'
    >>> to_iso_date("September 15, 2025")
    '2025-09-15'
    """
    date_obj = datetime.datetime.strptime(date_str, "%B %d, %Y")
    return date_obj.strftime("%Y-%m-%d")

def encode_page_title(title: str) -> str:
    """
    Encodes a page title in the wiki url style
    >>> encode_page_title("Paimon's Paintings/Set 1")
    'Paimon%27s_Paintings/Set_1'
    >>> encode_page_title("Paimon's Paintings/Set Kiehl's")
    'Paimon%27s_Paintings/Set_Kiehl%27s'
    """
    return urllib.parse.quote(title.replace(" ", "_"))


if __name__ == "__main__":
    doctest.testmod(verbose=True)