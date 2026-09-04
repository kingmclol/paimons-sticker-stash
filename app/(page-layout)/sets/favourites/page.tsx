import PageHeader from "@/app/components/PageHeader";
import StickerGridViewer from "@/app/components/StickerGridViewer";
import { getStickers } from "@/app/utils/queries/stickers";

async function page() {
  const stickers = await getStickers();
  return (
    <>
      <PageHeader
        title={"Favourites"}
        imageAlt="Primogem"
        imageSrc="/primogem.png"
        description={"All of your favourite stickers. The collection grows!"}
      />
      <StickerGridViewer
        stickers={stickers}
        starredOnly
        canFilterStarred={false}
      />
    </>
  );
}

export default page;
