import prisma from "@/lib/prisma";
import PageHeader from "../components/PageHeader";
import CardGrid from "../components/CardGrid";
import CharacterCard from "../components/CharacterCard";

async function page() {
  const characters = await prisma.characters.findMany();
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
      <CardGrid>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </CardGrid>
    </>
  );
}

export default page;
