import CharacterCardGrid from "@/app/components/CharacterCardGrid";
import PageHeader from "@/app/components/PageHeader";
import { getCharacters } from "@/app/utils/queries/characters";
import { getStickerById } from "@/app/utils/queries/stickers";

async function page() {
  const characters = await getCharacters();
  const sticker = await getStickerById(31); // Venti: Falling Petals
  return (
    <>
      <PageHeader
        title="Characters"
        description="Characters that have stickers in Paimon's Sticker Stash"
        sticker={sticker}
      />
      <CharacterCardGrid characters={characters} />
    </>
  );
}

export default page;
