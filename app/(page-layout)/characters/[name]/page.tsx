import PageHeader from "@/app/components/PageHeader";
import StickerGridViewer from "@/app/components/StickerGridViewer";
import { decodeFromURL } from "@/app/utils/utils";
import prisma from "@/lib/prisma";

async function page({ params }: { params: { name: string } }) {
  const { name } = await params;
  const decodedName = decodeFromURL(name);
  const character = await prisma.characters.findUnique({
    where: { name: decodedName },
  });

  if (!character) {
    return (
      <>
        <PageHeader
          sticker={null}
          title="Unknown Character"
          description="The character you are looking for does not exist."
        />
        <StickerGridViewer stickers={[]} />
      </>
    );
  }

  const sticker = await prisma.stickers.findUnique({
    where: { id: character?.main_sticker_id || undefined },
  });
  const stickers = await prisma.stickers.findMany({
    where: {
      character_id: character?.id || undefined,
    },
  });
  return (
    <>
      <PageHeader
        sticker={sticker}
        title={character.name}
        description={character.description || ""}
      />
      <StickerGridViewer stickers={stickers} />
    </>
  );
}

export default page;
