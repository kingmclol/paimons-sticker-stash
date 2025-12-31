"""
Functions for writing data to stickers database. Running the file allows for manual editing of characters
"""
import sqlite3
from Entities import Character, Sticker
from utils import PROJECT_ROOT

DB_PATH = f"{PROJECT_ROOT}/prisma/stickers.db"


def get_connection():
    """
    Returns a connection to the stickers database
    """
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def initialize_database():
    """
    Initializes the database with the required tables if they do not exist
    """
    with get_connection() as conn:
        c = conn.cursor()
        c.executescript("""
        CREATE TABLE IF NOT EXISTS characters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at DATETIME NOT NULL DEFAULT (datetime('now')),
            updated_at DATETIME NOT NULL DEFAULT (datetime('now')),
            name TEXT NOT NULL UNIQUE,
            description TEXT,
            main_sticker_id INTEGER,
            FOREIGN KEY (main_sticker_id) REFERENCES stickers(id)
        );
        CREATE TABLE IF NOT EXISTS stickers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at DATETIME NOT NULL DEFAULT (datetime('now')),
            updated_at DATETIME NOT NULL DEFAULT (datetime('now')),
            set_number INTEGER NOT NULL,
            character_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            full_title TEXT NOT NULL,
            image_url_source TEXT NOT NULL,
            filename TEXT NOT NULL,
            filepath TEXT NOT NULL,
            FOREIGN KEY (character_id) REFERENCES characters(id),
            UNIQUE(set_number, character_id, title)
        );
        CREATE INDEX idx_set_number ON stickers(set_number);
        CREATE INDEX idx_character_id ON stickers(character_id);
        CREATE INDEX idx_character_name ON characters(name);
        """)
        conn.commit()


def character_exists_by_name(name: str) -> bool:
    """
    Checks if a character exists in the database by name
    """
    with get_connection() as conn:
        c = conn.cursor()
        c.execute("SELECT 1 FROM characters WHERE name = ?", (name,))
        return c.fetchone() is not None
    

def create_character(character: Character) -> int:
    """ 
    Creates a new character in the database. Returns the character ID.
    If the character already exists, returns the existing character ID.
    """
    with get_connection() as conn:
        c = conn.cursor()
        c.execute("SELECT id FROM characters WHERE name = ?", (character.name,))
        row = c.fetchone()
        if row:
            return row[0]
        c.execute("INSERT INTO characters (name, description, main_sticker_id) VALUES (?, ?, ?)", (character.name, character.description, character.main_sticker_id))
        conn.commit()
        return c.lastrowid

def get_character_by_name(name: str) -> Character | None:
    """
    Retrieves a character by name. Returns None if not found.
    """
    with get_connection() as conn:
        c = conn.cursor()
        c.execute("SELECT * FROM characters WHERE name = ?", (name,))
        row = c.fetchone()
        if row:
            return Character(
                id=row["id"],
                name=row["name"],
                description=row["description"],
                main_sticker_id=row["main_sticker_id"]
            )
        return None


def get_character_by_id(id: int) -> Character | None:
    """
    Gets a Character by ID. Returns None if not found
    """
    with get_connection() as conn:
        c = conn.cursor()
        c.execute("SELECT * FROM characters WHERE id = ?", (id,))
        row = c.fetchone()
        if row:
            return Character(
                id=row["id"],
                name=row["name"],
                description=row["description"],
                main_sticker_id=row["main_sticker_id"]
            )
        return None


def get_all_characters() -> list[Character]:
    """
    Returns a list of all characters in the database
    """
    with get_connection() as conn:
        c = conn.cursor()
        c.execute("SELECT * FROM characters")
        rows = c.fetchall()
        characters = []
        for row in rows:
            characters.append(Character(
                id=row["id"],
                name=row["name"],
                description=row["description"],
                main_sticker_id=row["main_sticker_id"]
            ))
        return characters


def update_character(character: Character):
    """
    Updates an existing character in the database
    """
    with get_connection() as conn:
        c = conn.cursor()
        c.execute("""
        UPDATE characters
        SET name = ?, description = ?, main_sticker_id = ?, updated_at = datetime('now')
        WHERE id = ?
        """, (character.name, character.description, character.main_sticker_id, character.id))
        conn.commit()


def create_sticker(sticker: Sticker) -> int:
    """
    Creates a new sticker in the database. Returns the sticker ID.
    If the sticker already exists, returns the existing sticker ID.
    """
    with get_connection() as conn:
        c = conn.cursor()
        c.execute("""
        SELECT * FROM stickers 
        WHERE set_number = ? AND character_id = ? AND title = ?
        """, (sticker.set_number, sticker.character_id, sticker.title))
        row = c.fetchone()
        if row:
            return row["id"]
        c.execute("""
        INSERT INTO stickers 
        (set_number, character_id, title, full_title, image_url_source, filename, filepath) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (sticker.set_number, sticker.character_id, sticker.title, sticker.full_title,
              sticker.image_url_source, sticker.filename, sticker.filepath))
        conn.commit()
        return c.lastrowid

def get_sticker_by_id(id: int) -> Sticker | None:
    """
    Gets a Sticker by ID. Returns None if not found
    """
    with get_connection() as conn:
        c = conn.cursor()
        c.execute("SELECT * FROM stickers WHERE id = ?", (id,))
        row = c.fetchone()
        if row:
            return Sticker(
                title=row["title"],
                image_url_source=row["image_url_source"],
                character=get_character_by_id(row["character_id"]).name if get_character_by_id(row["character_id"]) else "",
                set_number=row["set_number"],
                id=row["id"],
                character_id=row["character_id"]
            )
        return None

def update_sticker(sticker: Sticker):
    """
    Updates an existing sticker in the database
    """
    with get_connection() as conn:
        c = conn.cursor()
        c.execute("""
        UPDATE stickers
        SET set_number = ?, character_id = ?, title = ?, full_title = ?, 
            image_url_source = ?, filename = ?, filepath = ?, updated_at = datetime('now')
        WHERE id = ?
        """, (sticker.set_number, sticker.character_id, sticker.title, sticker.full_title,
              sticker.image_url_source, sticker.filename, sticker.filepath, sticker.id))
        conn.commit()


def get_stickers_by_character_id(character_id: int) -> list[Sticker]:
    """
    Returns a list of stickers for a given character ID
    """
    with get_connection() as conn:
        c = conn.cursor()
        c.execute("SELECT * FROM stickers WHERE character_id = ?", (character_id,))
        rows = c.fetchall()
        stickers = []
        for row in rows:
            stickers.append(Sticker(
                title=row["title"],
                image_url_source=row["image_url_source"],
                character=get_character_by_id(row["character_id"]).name if get_character_by_id(row["character_id"]) else "",
                set_number=row["set_number"],
                id=row["id"],
                character_id=row["character_id"]
            ))
        return stickers


def character_sticker_count(character_id: int) -> int:
    """
    Returns the number of stickers for a given character ID
    """
    with get_connection() as conn:
        c = conn.cursor()
        c.execute("SELECT COUNT(*) FROM stickers WHERE character_id = ?", (character_id,))
        row = c.fetchone()
        return row[0] if row else 0


if __name__ == "__main__":
    """ Allows for manual editing of characters in the database kind of """
    running = True
    while running:
        print("Editing characters table.")
        print("\t1: List all characters\n\t2: Edit character by ID\n\t3: Exit")
        cmd = input(">>> ").strip()
        match cmd:
            case "1":
                characters = get_all_characters()
                print(f"{'ID':<5}{'Name':<25}{'Sticker ID':<15}{'Stickers':<15}{'Description'}")
                for character in characters:
                    print(f"{character.id:<5}{character.name:<25}{character.main_sticker_id:<15}{character_sticker_count(character.id):<15}{character.description}")
            case "2":
                char_id = input("Enter character ID to edit: ").strip()
                character = get_character_by_id(int(char_id))
                if character:
                    print(f"Editing character: {character.name} (ID: {character.id})")
                    new_description = input(f"New description (leave blank to keep current): ").strip()
                    character_stickers = get_stickers_by_character_id(character.id)
                    print("Character Stickers:")
                    print(f"{'ID':<5}{'SET':<5}{'Title'}")
                    for sticker in character_stickers: 
                        print(f"{sticker.id:<5}{sticker.set_number:<5}{sticker.title}")
                    new_sticker_id = input(f"New main sticker ID (current: {character.main_sticker_id}, leave blank to keep current): ").strip()
                    if new_description:
                        character.description = new_description
                    if new_sticker_id:
                        if any(sticker.id == int(new_sticker_id) for sticker in character_stickers):
                            character.main_sticker_id = int(new_sticker_id)
                        else:
                            print("Invalid sticker ID; main sticker not changed.")
                    update_character(character)
                    print("Character updated.")
                else:
                    print("Character not found.")
            case "3":
                running = False
                print("Exiting.")