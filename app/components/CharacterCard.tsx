import { Character } from "@/lib/types";
import Card from "./Card";
import { encodeForURL } from "../utils/utils";

function CharacterCard({ character }: { character: Character }) {
  return (
    <Card
      title={character.name}
      imageSrc={character.main_sticker?.filepath ?? "/Item_Unknown.webp"}
      href={`/characters/${encodeForURL(character.name)}`}
      id={character.id}
    >
      <p>
        <span className="font-bold">{character.num_stickers}</span> sticker
        {character.num_stickers !== 1 ? "s" : ""}
      </p>
    </Card>
  );
}

export default CharacterCard;
