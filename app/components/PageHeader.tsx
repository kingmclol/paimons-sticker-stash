import { StickerView } from "@/lib/types";
import Image from "next/image";

function PageHeader({
  sticker,
  imageSrc,
  imageAlt,
  title,
  description,
}: {
  sticker?: StickerView | null | undefined;
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pb-8 md:flex-nowrap md:justify-start md:gap-8 md:p-8">
      <div className="flex-none rounded-2xl border-2 p-2">
        <Image
          src={sticker?.filepath ?? imageSrc ?? "/Item_Unknown.webp"}
          width={128}
          height={128}
          alt={sticker?.full_title ?? imageAlt ?? "Unknown"}
        />
      </div>
      <div className="flex flex-col justify-around gap-4">
        <h1 className="text-center text-4xl font-bold tracking-wide underline md:text-left">
          {title}
        </h1>
        {<p>{description}</p>}
      </div>
    </div>
  );
}

export default PageHeader;
