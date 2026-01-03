import prisma from "@/lib/prisma";
import { characters, sticker_sets, stickers } from "../generated/prisma/client";
import StashFilters from "../components/StashFilters";
import StickerGrid from "../components/StickerGrid";

async function page({
  searchParams,
}: {
  searchParams: {
    set?: string;
    character?: string;
  };
}) {
  const stickers = await prisma.stickers.findMany();
  const sets = await prisma.sticker_sets.findMany();
  const characters = await prisma.characters.findMany();

  const {set, character} = await searchParams;
  const selectedSet = set || "all";
  const selectedCharacter = character || "all";
  let filteredStickers = stickers;
  if (selectedSet !== "all") {
    // Selected set is a set ID.
    filteredStickers = filteredStickers.filter(
      (sticker) => sticker.set_id === Number(selectedSet),
    );
  }
  if (selectedCharacter !== "all") {
    // Selected character is a character ID.
    filteredStickers = filteredStickers.filter(
      (sticker) => sticker.character_id === Number(selectedCharacter),
    );
  }

  return (
    <div className="grid h-full grid-rows-[auto_1fr]">
      <div className="flex gap-2">
        <StashFilters characters={characters} sets={sets} />
      </div>
      <StickerGrid stickers={filteredStickers} />
    </div>
  );
}

export default page;
