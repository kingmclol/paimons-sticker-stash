import { decodeFromURL } from "@/app/utils/utils";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedName = decodeFromURL(slug);
  const charExists =
    (await prisma.characters.count({
      where: { name: decodedName },
    })) > 0;

  const metadata: Metadata = {
    alternates: {
      canonical: `/characters/${slug}`,
    },
  };

  if (!charExists) {
    return { ...metadata, title: "Sticker Stash: Unknown" };
  } else return { ...metadata, title: `Sticker Stash: ${decodedName}` };
}

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
