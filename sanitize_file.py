import re

def sanitize_filename(filename: str) -> str:
    # Remove invalid characters for Windows filenames
    return re.sub(r'[<>:"/\\|?*]', '', filename).strip()