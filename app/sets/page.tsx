import prisma from "@/lib/prisma";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import StickerSetCard from "../components/StickerSetCard";
import CardGrid from "../components/CardGrid";

async function page() {
  const stickerSets = await prisma.sticker_sets.findMany();
  const pageSticker = await prisma.stickers.findUnique({
    where: { id: 134 }, // Kokomi: Laid-Back
  });
  return (
    <>
      <PageHeader
        sticker={pageSticker}
        title="Sticker Sets"
        description="Most of the sticker sets that existed in the Paimon's Paintings page on the wiki, along with your own CUSTOMIZABLE set!"
      />
      <CardGrid>
        <Card
          href="/sets/favourites"
          imageSrc="/primogem.png"
          title="Favourites"
          subtext="All of the stickers your favourite stickers, all in one place!"
        />
        {stickerSets.map((set) => (
          <StickerSetCard key={set.id} stickerSet={set} />
        ))}
      </CardGrid>
    </>
  );
}

export default page;
