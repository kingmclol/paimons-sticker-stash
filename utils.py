"""
Utils
"""
import os
from typing import Tuple

import requests
import datetime
from Entities import Sticker


def download_sticker(sticker: Sticker) -> Tuple[str, bool]:
    """
    Downloads the sticker's image to the local images/ directory. Returns a tuple with the filePATH (empty if failed)
    and whether it was a cached download (already in computer so skipped downloading from source).
    """
    log(f"Downloading {sticker.full_title} (set {sticker.set_number})...")
    os.makedirs("images", exist_ok=True)  # Ensure the directory exists
    response = requests.get(sticker.image_url_source)
    if response.status_code == 200:
        os.makedirs(f"./images/set_{sticker.set_number}", exist_ok=True)  # Ensure the set directory exists
        if os.path.exists(f"./images/set_{sticker.set_number}/{sticker.filename}"):
            # If for some reason it already exists, skip.
            log(f"File {sticker.filename} already exists, skipping download.")
            return f"./images/set_{sticker.set_number}/{sticker.filename}", True

        with open(f"./images/set_{sticker.set_number}/{sticker.filename}", "wb") as f:
            f.write(response.content)
        log(f"Downloaded {sticker.full_title} as {sticker.filename}")
        return f"./images/set_{sticker.set_number}/{sticker.filename}", False
    else:
        print(f"Failed to download {sticker.full_title}")
        return "", False


def get_sticker_set_url(set_number: int) -> str:
    """
    Returns the target source URL for the sticker set given its set number
    """
    return f"https://genshin-impact.fandom.com/wiki/Paimon%27s_Paintings/Set_{set_number}"


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
