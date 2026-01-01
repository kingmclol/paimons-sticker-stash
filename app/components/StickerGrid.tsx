"use client";

import { useState } from "react";
import { stickers, sticker_sets, characters } from "../generated/prisma/client";
import Image from "next/image";

function StickerGrid({
  stickers,
  sets,
  characters,
}: {
  stickers: stickers[];
  sets: sticker_sets[];
  characters: characters[];
}) {
  const [selectedSet, setSelectedSet] = useState("all");
  const [selectedCharacter, setSelectedCharacter] = useState("all");

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
    <div className="grid h-dvh grid-rows-[auto_1fr]">
      <div className="flex gap-2">
        <select
          className="roundedlg w-24 border bg-white px-2 py-1 text-black"
          value={selectedSet}
          onChange={(e) => setSelectedSet(e.target.value)}
        >
          <option value={"all"}>All Sets</option>
          {sets.map((set) => (
            <option key={set.id} value={set.id}>
              Set {set.name}
            </option>
          ))}
        </select>
        <select
          className="roundedlg border bg-white px-2 py-1 text-black"
          value={selectedCharacter}
          onChange={(e) => setSelectedCharacter(e.target.value)}
        >
          <option value={"all"}>All Characters</option>
          {characters.map((character) => (
            <option key={character.id} value={character.id}>
              {character.name}
            </option>
          ))}
        </select>
      </div>
      {filteredStickers.length > 0 ? (
        <div className="grid auto-rows-min grid-cols-2 items-start gap-2 overflow-auto p-2 sm:grid-cols-3 lg:grid-cols-4">
          {filteredStickers.map((sticker) => (
            <div
              className="flex flex-col items-center justify-center gap-2"
              key={sticker.id}
            >
              <Image
                width={256}
                height={256}
                src={sticker.filepath}
                alt={sticker.full_title}
              />
              <p className="text-center font-bold">{sticker.full_title}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-lg font-bold tracking-wide">
          <div className="flex flex-col items-center justify-center text-center p-2">
            <Image
              src="/stickers/set_1/Icon_Emoji_Paimon's_Paintings_01_Amber_2.png"
              width={256}
              height={256}
              alt="Amber: Save me!"
            />
            No stickers found! Loosen up your set and/or character filters.
          </div>
        </div>
      )}
    </div>
  );
}

export default StickerGrid;
