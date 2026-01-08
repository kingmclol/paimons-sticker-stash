"use client";
import toast from "react-hot-toast";
import { stickers } from "../generated/prisma/client";
import ErrorImage from "./ErrorImage";
import Starrable from "./Starrable";
import StickerCard from "./StickerCard";

function StickerGrid({
  stickers,
  starredStickerIds,
  setFavouriteStickerIds,
}: {
  stickers: stickers[];
  starredStickerIds: number[];
  setFavouriteStickerIds: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  function toggleStar(stickerId: number) {
    const sticker = stickers.find((s) => s.id === stickerId);
    if (!sticker) {
      toast.error("Sticker not found");
      return;
    }
    if (starredStickerIds.includes(stickerId)) {
      setFavouriteStickerIds((prev) => prev.filter((id) => id !== stickerId));
      toast(
        () => (
          <span>
            <span className="font-semibold tracking-wide text-red-600">
              Removed
            </span>{" "}
            {sticker.full_title}
          </span>
        ),
        { id: String(sticker.id) },
      );
    } else {
      setFavouriteStickerIds((prev) => [...prev, stickerId]);
      toast(
        () => (
          <span>
            <span className="font-semibold tracking-wide text-green-600">
              Added
            </span>{" "}
            {sticker.full_title}
          </span>
        ),
        { id: String(sticker.id) },
      );
    }
  }
  if (stickers.length == 0) {
    return (
      <div className="flex items-center justify-center text-lg font-bold tracking-wide">
        <div className="flex flex-col items-center justify-center p-2 text-center">
          <ErrorImage />
          No stickers found
        </div>
      </div>
    );
  }

  return (
    <div className="grid auto-rows-min grid-cols-2 items-start gap-2 overflow-auto p-2 sm:grid-cols-3 lg:grid-cols-4">
      {stickers.map((sticker) => (
        <Starrable
          key={sticker.id}
          isStarred={starredStickerIds.includes(sticker.id)}
          onClick={() => toggleStar(sticker.id)}
        >
          <StickerCard sticker={sticker} />
        </Starrable>
      ))}
    </div>
  );
}

export default StickerGrid;
