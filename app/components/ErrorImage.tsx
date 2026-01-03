import prisma from "@/lib/prisma";
import Image from "next/image";

// const stickerPool = [8, 6, 25, 39]
// id 8: Amber: Save me!
// id 6: Amber: Nooooo!
// id 25: Qiqi: Fallen
// id 39: Diona: Irritiable

// Well nevermind this won't work
async function ErrorImage({ size = 256 }: { size?: number }) {
  const sticker = await prisma.stickers.findUnique({
    where: { id: 8 },
  });
  return (
    <Image
      src={sticker!.filepath}
      width={size}
      height={size}
      alt={sticker!.full_title}
    />
  );
}

export default ErrorImage;
