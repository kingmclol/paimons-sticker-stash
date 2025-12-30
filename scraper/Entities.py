"""
Entities file
"""
from sanitize_file import sanitize_filename


class Sticker:
    """
    Dataclass to represent a sticker.
    Attributes:
        - title: The title of the s ticker
        - image_url_source: The source URL of the sticker's image
        - character: The character associated with the sticker
        - full_title: The full title of the sticker (as "Character: Title")
        - set_number: The sticker set number
        - filename: The sanitized filename for the sticker image
        - filepath: The local filepath where the sticker image is saved ("" if not saved yet)
        - id: the sticker's database ID (None if not saved yet)
        - character_id: the character's database ID (None if not saved yet)
    """
    title: str
    image_url_source: str
    character: str
    full_title: str
    set_number: int
    filename: str
    filepath: str
    id: int | None
    character_id: int | None

    def __init__(self,
                 title: str,
                 image_url_source: str,
                 character: str, set_number: int,
                 id: int | None = None,
                 character_id: int | None = None):
        self.title = title
        self.image_url_source = image_url_source
        self.character = character
        self.full_title = f"{character}: {title}"
        self.set_number = set_number
        self.filename = sanitize_filename(f"{character}_{title}.png")
        self.filepath = ""
        self.id = id
        self.character_id = character_id

    def __str__(self) -> str:
        return (f"Sticker(id={self.id},"
                f" title={self.title},"
                f" character={self.character},"
                f" character_id={self.character_id},"
                f" set={self.set_number},"
                f" image_url_source={self.image_url_source})")


class Character:
    """
    Dataclass to represent a character.
    Attributes:
        - id: The id of the character (None if not saved yet)
        - name: The name of the character
        - description: A short description/blurb for the character
        - main_sticker_id: ID for a primary sticker to represent the character (or None if not assigned)
    """
    id: int | None
    name: str
    description: str
    main_sticker_id: int | None

    def __init__(self,
                 name: str,
                 description: str = "...",
                 id: int | None = None,
                 main_sticker_id: int | None = None):
        self.id = id
        self.description = description
        self.name = name
        self.main_sticker_id = main_sticker_id

    def __str__(self) -> str:
        return (f"Character(id={self.id},"
                f" name={self.name},"
                f" description={self.description},"
                f" main_sticker_id={self.main_sticker_id})")
