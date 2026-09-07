import { getStickerById } from "@/app/utils/queries/stickers";
import { getStickerSets } from "@/app/utils/queries/stickerSets";
import prisma from "@/lib/prisma";
import { StickerSetView } from "@/lib/types";
import Card from "../../components/Card";
import PageHeader from "../../components/PageHeader";
import StickerSetCard from "../../components/StickerSetCard";

async function page() {
  const stickerSets: StickerSetView[] = await getStickerSets();
  const pageSticker = await getStickerById(134); // Kokomi: Laid-Back
 
  return (
    <>
      <PageHeader
        sticker={pageSticker}
        title="Sticker Sets"
        description="Sticker sets taken from the Fandom Wiki's Paimon's Paintings page, along with your own CUSTOMIZABLE set!"
      />
      <div className="grid auto-rows-min grid-cols-1 items-start gap-8 sm:grid-cols-2">
        <Card
          href="/sets/favourites"
          imageSrc="/primogem.png"
          title="Favourites"
          subtext="Your favourite stickers!"
        />
        {stickerSets.map((set) => (
          <StickerSetCard key={set.id} stickerSet={set} />
        ))}
      </div>
    </>
  );
}

export default page;
