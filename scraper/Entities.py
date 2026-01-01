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
        - set_id: The sticker set id
        - set_name: The sticker set name
        - filename: The sanitized filename for the sticker image
        - filepath: The local filepath where the sticker image is saved ("" if not saved yet)
        - id: the sticker's database ID (None if not saved yet)
        - character_id: the character's database ID (None if not saved yet)
    """
    title: str
    image_url_source: str
    character: str
    full_title: str
    set_id: int
    set_name: str
    filename: str
    filepath: str
    id: int | None
    character_id: int | None

    def __init__(self,
                 title: str,
                 image_url_source: str,
                 character: str,
                 set_id: int,
                 set_name: str,
                 filename: str,
                 id: int | None = None,
                 character_id: int | None = None):
        self.title = title
        self.image_url_source = image_url_source
        self.character = character
        self.full_title = f"{character}: {title}"
        self.set_id = set_id
        self.filename = filename
        self.filepath = ""
        self.id = id
        self.character_id = character_id
        self.set_name = set_name

    def __str__(self) -> str:
        return (f"Sticker(id={self.id},"
                f" title={self.title},"
                f" character={self.character},"
                f" character_id={self.character_id},"
                f" set_name={self.set_name},"
                f" set_id={self.set_id},"
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

class StickerSet:
    """
    Dataclass to represent a sticker set.
    Attributes:
        - id: The set id (None if not saved yet)
        - name: The name of the sticker set
        - main_sticker_id: ID for a primary sticker to represent the set (or None if not assigned)
        - release_date: The release date of the sticker set (or None if not assigned)
    """
    id: int | None
    name: str
    main_sticker_id: int | None
    release_date: str | None
    def __init__(self,
                 name: str,
                 id: int | None = None,
                 main_sticker_id: int | None = None,
                 release_date: str | None = None):
        self.id = id
        self.name = name
        self.main_sticker_id = main_sticker_id
        self.release_date = release_date

    def __str__(self) -> str:
        return (f"StickerSet(id={self.id},"
                f" name={self.name},"
                f" main_sticker_id={self.main_sticker_id},"
                f" release_date={self.release_date})")
    