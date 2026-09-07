"""
Constants and configuration for the scraper
"""

from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
STICKERS_DIR = PROJECT_ROOT / "public" / "stickers"
LATEST_SET_PATH = PROJECT_ROOT / "scripts" / "scraper" / "latest_set.txt"
ENDPOINT = "https://genshin-impact.fandom.com/api.php"



