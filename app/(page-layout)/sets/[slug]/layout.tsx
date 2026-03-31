import { decodeFromURL } from "@/app/utils/utils";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  console.log(slug);
  const decodedName = decodeFromURL(slug);
  const setExists =
    (await prisma.sticker_sets.count({
      where: { name: decodedName },
    })) > 0;

  const metadata: Metadata = {
    alternates: {
      canonical: `/sets/${slug}`,
    },
  };

  if (!setExists) {
    return { ...metadata, title: "Sticker Stash: Set Unknown" };
  } else return { ...metadata, title: `Sticker Stash: Set ${decodedName}` };
}

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
