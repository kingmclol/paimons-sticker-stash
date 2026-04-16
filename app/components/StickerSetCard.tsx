import { encodeForURL, formatDate } from "../utils/utils";
import Card from "./Card";
import { StickerSet } from "@/lib/types";

async function StickerSetCard({ stickerSet }: { stickerSet: StickerSet }) {
  let releaseDate;

  if (!stickerSet.release_date) {
    releaseDate = "Unknown";
  } else {
    releaseDate = formatDate(stickerSet.release_date);
  }

  return (
    <Card
      imageSrc={stickerSet?.main_sticker?.filepath}
      title={`Set ${stickerSet.name}`}
      href={`/sets/${encodeForURL(stickerSet.name)}`}
      id={stickerSet.id}
    >
      <p>
        Released <span className="font-semibold">{releaseDate}</span>
      </p>
    </Card>
  );
}

export default StickerSetCard;
