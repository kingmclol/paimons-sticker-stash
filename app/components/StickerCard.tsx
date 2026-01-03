import Image from "next/image";
import { stickers } from "../generated/prisma/client";

function StickerCard({ sticker }: { sticker: stickers }) {
  return (
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
      <p className="text-center font-bold">
        {sticker.full_title} (ID: {sticker.id})
      </p>
    </div>
  );
}

export default StickerCard;
