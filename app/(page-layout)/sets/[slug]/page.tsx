import PageHeader from "@/app/components/PageHeader";
import StickerGridViewer from "@/app/components/StickerGridViewer";
import { getStickerSetByName } from "@/app/utils/queries/stickerSets";
import { decodeFromURL, formatDate } from "@/app/utils/utils";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedName = decodeFromURL(slug);
  const stickerSet = await getStickerSetByName(decodedName);


  if (!stickerSet) {
    return (
      <>
        <PageHeader
          sticker={null}
          title="Unknown Set"
          description="The sticker set you are looking for does not exist."
        />
        <StickerGridViewer stickers={[]} />
      </>
    );
  }
  const sticker = stickerSet.main_sticker
  const stickers = stickerSet.stickers
  return (
    <>
      <PageHeader
        sticker={sticker}
        title={`Set ${stickerSet.name}`}
        description={`Released ${formatDate(stickerSet?.release_date)}`}
      />
      <StickerGridViewer stickers={stickers} />
    </>
  );
}

export default page;
