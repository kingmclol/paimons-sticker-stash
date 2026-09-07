"""
Constants and configuration for the scraper
"""

from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
STICKERS_DIR = PROJECT_ROOT / "public" / "stickers"
LATEST_SET_PATH = PROJECT_ROOT / "scripts" / "scraper" / "latest_set.txt"
ENDPOINT = "https://genshin-impact.fandom.com/api.php"

# probably should be moved to a shared config between frontend and scraper, but for now this is fine as database stores the character and title and frontend trusts db
FALLBACK_CHARACTER = "Unknown"
FALLBACK_TITLE = "Unknown"
