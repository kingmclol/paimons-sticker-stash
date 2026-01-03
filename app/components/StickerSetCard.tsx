import prisma from "@/lib/prisma";
import { sticker_sets } from "../generated/prisma/client";
import Card from "./Card";
import { format } from "date-fns";

async function StickerSetCard({ stickerSet }: { stickerSet: sticker_sets }) {
  let image;
  let releaseDate;
  const main_sticker = await prisma.stickers.findUnique({
    where: { id: stickerSet.main_sticker_id ?? undefined },
  });
  if (!main_sticker) {
    // Somehow no main sticker assigned, so use unknown image
    image = "/Item_Unknown.webp";
  } else {
    image = main_sticker.filepath;
  }

  if (!stickerSet.release_date) {
    releaseDate = "Unknown"
  } else {
    releaseDate = format(stickerSet.release_date, "MMMM d, yyyy")
  }

  
  return (
    <Card
      imageSrc={image}
      subtext={`Released ${releaseDate}`}
      title={`Set ${stickerSet.name}`}
      href={`/sets/${stickerSet.name}`}
      id={stickerSet.id}
    />
  );
}

export default StickerSetCard;
