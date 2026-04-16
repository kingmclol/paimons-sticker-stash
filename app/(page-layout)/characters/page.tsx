import CharacterCardGrid from "@/app/components/CharacterCardGrid";
import PageHeader from "@/app/components/PageHeader";
import prisma from "@/lib/prisma";
import { Character } from "@/lib/types";

async function page() {
  const characters: Character[] = await prisma.characters
    .findMany({
      include: {
        main_sticker: true,
        _count: {
          select: { stickers: true },
        },
      },
    })
    .then((characters) =>
      characters.map((char) => ({
        ...char,
        num_stickers: char._count.stickers,
      })),
    );

  const sticker = await prisma.stickers.findUnique({
    where: { id: 31 }, // Venti: Falling Petals
  });
  return (
    <>
      <PageHeader
        title="Characters"
        description="Characters that have stickers in Paimon's Sticker Stash"
        sticker={sticker}
      />
      <CharacterCardGrid
        characters={characters}
      />
    </>
  );
}

export default page;
