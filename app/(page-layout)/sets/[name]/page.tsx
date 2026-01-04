import PageHeader from "@/app/components/PageHeader";
import StickerGrid from "@/app/components/StickerGrid";
import { formatDate } from "@/app/utils/utils";
import prisma from "@/lib/prisma";

async function page({ params }: { params: { name: string } }) {
  const { name } = await params;
  const stickerSet = await prisma.sticker_sets.findUnique({
    where: { name: name },
  });

  if (!stickerSet) {
    return (
      <>
        <PageHeader
          sticker={null}
          title="Unknown Set"
          description="The sticker set you are looking for does not exist."
        />
        <StickerGrid stickers={[]} />
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
      <StickerGrid stickers={stickers} />
    </>
  );
}

export default page;
