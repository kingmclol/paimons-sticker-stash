"""
Utils
"""
import os
from typing import Tuple

import urllib.parse
import requests
import datetime
from Entities import Sticker

# utils.py located in ROOT/scraper so going back two levels to get to ROOT
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

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


def get_sticker_set_url(set_name: str) -> str:
    """
    Returns the target source URL for the sticker set given its set name
    """
    return f"https://genshin-impact.fandom.com/wiki/Paimon%27s_Paintings/Set_{set_name}"


def extract_sticker_original_image_url(lowres_url: str) -> str:
    """
    Given a sticker image URL from the wiki, returns the original image URL by truncating after .png
    Example input:
    [WIKI_URL]/images/c/c0/[STICKER_NAME].png/revision/latest/scale-to-width-down/185?cb=20250915173336
    Example output:
    [WIKI_URL]/images/c/c0/[STICKER_NAME].png
    """
    return lowres_url.split("/revision")[0]


def extract_filename(image_source_url: str) -> str:
    """
    Given a CLEANED image source URL, extracts the filename from it.
    Example input:
    [WIKI_URL]/images/7/7a/Icon_Emoji_Paimon's_Paintings_43_Ineffa_2.png
    Example output:
    Icon_Emoji_Paimon's_Paintings_43_Ineffa_2.png
    """
    return urllib.parse.unquote(image_source_url.split("/")[-1])

def get_latest_set() -> int:
    """
    Returns the latest sticker set number from latest_set.txt
    """
    with open("latest_set.txt", "r") as f:
        latest_set = int(f.read().strip())
    return latest_set


def update_latest_set(set_number: int):
    """
    Updates the latest sticker set number in latest_set.txt
    """
    with open("latest_set.txt", "w") as f:
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
    Example: "September 15, 2025" -> "2025-09-15"
    """
    date_obj = datetime.datetime.strptime(date_str, "%B %d, %Y")
    return date_obj.strftime("%Y-%m-%d")
