import prisma from "@/lib/prisma";
import { characters } from "../generated/prisma/client";
import Card from "./Card";

async function CharacterCard({ character }: { character: characters }) {
  const main_sticker = await prisma.stickers.findUnique({
    where: { id: character.main_sticker_id ?? undefined },
  });
  return (
    <Card
      title={character.name}
      imageSrc={main_sticker?.filepath ?? "Item_Unknown.webp"}
      subtext={character.description ?? "..."}
      href={`/characters/${character.name}`}
      id={character.id}
    />
  );
}

export default CharacterCard;
