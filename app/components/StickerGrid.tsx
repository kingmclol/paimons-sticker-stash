import { stickers } from "../generated/prisma/client";
import ErrorImage from "./ErrorImage";
import StickerCard from "./StickerCard";

function StickerGrid({ stickers }: { stickers: stickers[] }) {
  if (stickers.length == 0) {
    return (
      <div className="flex items-center justify-center text-lg font-bold tracking-wide">
        <div className="flex flex-col items-center justify-center p-2 text-center">
          <ErrorImage/>
          No stickers found
        </div>
      </div>
    );
  }

  return (
    <div className="grid auto-rows-min grid-cols-2 items-start gap-2 overflow-auto p-2 sm:grid-cols-3 lg:grid-cols-4">
      {stickers.map((sticker) => (
        <StickerCard key={sticker.id} sticker={sticker} />
      ))}
    </div>
  );
}

export default StickerGrid;
