import Image from "next/image";
import { stickers } from "../generated/prisma/client";

function StickerCard({ sticker }: { sticker: stickers }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center gap-2"
      key={sticker.id}
    >
      <div className="relative">
        <Image
          width={256}
          height={256}
          src={sticker.filepath}
          alt={sticker.full_title}
        />
        <div className="bg-background absolute right-2 bottom-1 rounded px-1 text-sm opacity-75">
          ID {sticker.id}
        </div>
      </div>
      <p className="text-center font-bold">{sticker.full_title}</p>
    </div>
  );
}

export default StickerCard;
