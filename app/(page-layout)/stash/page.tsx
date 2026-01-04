import PageHeader from "@/app/components/PageHeader";
import StickerGridViewer from "@/app/components/StickerGridViewer";
import prisma from "@/lib/prisma";

async function page() {
  const stickers = await prisma.stickers.findMany();

  const sticker = await prisma.stickers.findUnique({
    where: { id: 10 }, // Paimon: Ship Out!
  });
  return (
    <>
      <PageHeader
        title="Sticker Stash"
        sticker={sticker}
        description="You found Paimon's sticker stash! Time to look through the bounty..."
      />
      <StickerGridViewer stickers={stickers} />
    </>
  );
}

export default page;
