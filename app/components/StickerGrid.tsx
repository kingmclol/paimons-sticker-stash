"use client";
import { stickers } from "../generated/prisma/client";
import useHasHydrated from "../hooks/useHasHydrated";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import ErrorImage from "./ErrorImage";
import Starrable from "./Starrable";
import StickerCard from "./StickerCard";

function StickerGrid({ stickers }: { stickers: stickers[] }) {
  const [favouriteStickerIds, setFavouriteStickerIds] = useLocalStorageState<
    number[]
  >([], "favouriteStickerIds");
  const hydrated = useHasHydrated();

  if (!hydrated) {
    return null;
  }

  function toggleStar(stickerId: number) {
    if (favouriteStickerIds.includes(stickerId)) {
      setFavouriteStickerIds((prev) => prev.filter((id) => id !== stickerId));
    } else {
      setFavouriteStickerIds((prev) => [...prev, stickerId]);
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
          isStarred={favouriteStickerIds.includes(sticker.id)}
          onClick={() => toggleStar(sticker.id)}
        >
          <StickerCard sticker={sticker} />
        </Starrable>
      ))}
    </div>
  );
}

export default StickerGrid;
