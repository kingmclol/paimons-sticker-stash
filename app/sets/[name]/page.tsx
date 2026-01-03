import prisma from "@/lib/prisma";
import Image from "next/image";

async function page({ params }: { params: { name: string } }) {
  const stickerSets = await prisma.sticker_sets.findMany();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4">
      <div className="grid grid-rows-2">
        <div className="flex gap-8 p-8">
          <div className="rounded-2xl border-2">
            <Image
              src="/stickers/set_1/Icon_Emoji_Paimon's_Paintings_01_Amber_2.webp"
              width={128}
              height={128}
              alt="Amber: Save me!"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-wide underline">
              Sticker Sets
            </h1>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default page;
