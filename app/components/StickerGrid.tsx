"use client";

import { useState } from "react";
import { stickers } from "../generated/prisma/client";

function StickerGrid({ stickers }: { stickers: stickers[] }) {
  const [selectedSet, setSelectedSet] = useState("all");
  const sets = Array.from({ length: 45 }, (_, index) => index + 1);

  const filteredStickers =
    selectedSet === "all"
      ? stickers
      : stickers.filter(
          (sticker) => sticker.set_number === Number(selectedSet),
        );

  return (
    <div>
      <div className="flex gap-2">
        <select
          className="bg-white text-black px-2 py-1 w-24 border roundedlg"
          value={selectedSet}
          onChange={(e) => setSelectedSet(e.target.value)}
        >
          <option value={"all"}>All Sets</option>
          {sets.map((setNum) => (
            <option key={setNum} value={setNum}>
              Set {setNum}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {filteredStickers.map((sticker) => (
          <div
            className="flex flex-col items-center justify-center gap-2"
            key={sticker.id}
          >
            <img className="h-64 w-64" src={sticker.filepath} />
            <p className="text-center font-bold">{sticker.full_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickerGrid;
