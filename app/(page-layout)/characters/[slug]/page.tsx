import PageHeader from "@/app/components/PageHeader";
import StickerGridViewer from "@/app/components/StickerGridViewer";
import { getCharacterByName } from "@/app/utils/queries/characters";
import { decodeFromURL } from "@/app/utils/utils";
import prisma from "@/lib/prisma";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedName = decodeFromURL(slug);
  const character = await getCharacterByName(decodedName);

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

  const sticker = character.main_sticker
  const stickers = character.stickers;

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
