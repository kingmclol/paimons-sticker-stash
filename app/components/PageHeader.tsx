import Image from "next/image";
import { stickers } from "../generated/prisma/client";

function PageHeader({
  sticker,
  imageSrc,
  imageAlt,
  title,
  description,
}: {
  sticker?: stickers | null | undefined;
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-8 p-8 items-center">
      <div className="flex-none rounded-2xl border-2 p-2">
        <Image
          src={sticker?.filepath ?? imageSrc ?? "/Item_Unknown.webp"}
          width={128}
          height={128}
          alt={sticker?.full_title ?? imageAlt ?? "Unknown"}
        />
      </div>
      <div className="flex flex-col justify-around gap-4">
        <h1 className="text-4xl font-bold tracking-wide underline">{title}</h1>
        {<p>{description}</p>}
      </div>
    </div>
  );
}

export default PageHeader;
