import PageHeader from "@/app/components/PageHeader";
import StickerGridViewer from "@/app/components/StickerGridViewer";
import { decodeFromURL, formatDate } from "@/app/utils/utils";
import prisma from "@/lib/prisma";

async function page({ params }: { params: { name: string } }) {
  const { name } = await params;
  const decodedName = decodeFromURL(name);
  const stickerSet = await prisma.sticker_sets.findUnique({
    where: { name: decodedName },
  });

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

  const sticker = await prisma.stickers.findUnique({
    where: { id: stickerSet?.main_sticker_id || undefined },
  });
  const stickers = await prisma.stickers.findMany({
    where: {
      set_id: stickerSet?.id || undefined,
    },
  });
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
