import prisma from "@/lib/prisma";
import { sticker_sets } from "../generated/prisma/client";
import { formatDate } from "../utils/utils";
import Card from "./Card";

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
    releaseDate = "Unknown";
  } else {
    releaseDate = formatDate(stickerSet.release_date);
  }

  return (
    <Card
      imageSrc={image}
      title={`Set ${stickerSet.name}`}
      href={`/sets/${stickerSet.name}`}
      id={stickerSet.id}
    >
      <p>
        Released <span className="font-semibold">{releaseDate}</span>
      </p>
    </Card>
  );
}

export default StickerSetCard;
