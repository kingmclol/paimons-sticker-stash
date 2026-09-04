import PageHeader from "@/app/components/PageHeader";
import StickerGridViewer from "@/app/components/StickerGridViewer";
import { getStickerById, getStickers } from "@/app/utils/queries/stickers";

async function page() {
  const stickers = await getStickers();
  const sticker = await getStickerById(10); // Paimon: Ship Out!

  return (
    <>
      <PageHeader
        title="Sticker Stash"
        sticker={sticker}
        description="You found Paimon's sticker stash! Time to look through the bounty..."
      />
      <StickerGridViewer stickers={stickers} canFilterStarred={true} />
    </>
  );
}

export default page;
