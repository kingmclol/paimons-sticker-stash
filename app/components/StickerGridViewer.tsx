import { characters, sticker_sets, stickers } from "../generated/prisma/client";
import StashFilters from "./StashFilters";
import StickerGrid from "./StickerGrid";

function StickerGridViewer({
  stickers,
  sets,
  characters,
  searchParams,
}: {
  stickers: stickers[];
  sets: sticker_sets[];
  characters: characters[];
  searchParams: {
    set?: string;
    character?: string;
  };
}) {
  const selectedSet = searchParams?.set || "all";
  const selectedCharacter = searchParams?.character || "all";
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

export default StickerGridViewer;
