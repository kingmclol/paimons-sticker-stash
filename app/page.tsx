import { prisma } from "@/lib/prisma";
import StickerGrid from "./components/StickerGrid";

export default async function Home() {
  const stickers = await prisma.stickers.findMany();
  const sticker_sets = await prisma.sticker_sets.findMany();
  console.log(stickers);
  return <StickerGrid stickers={stickers} sets={sticker_sets} />;
}
