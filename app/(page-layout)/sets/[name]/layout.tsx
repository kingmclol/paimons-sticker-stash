import { decodeFromURL } from "@/app/utils/utils";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeFromURL(name);
  const setExists =
    (await prisma.sticker_sets.count({
      where: { name: decodedName },
    })) > 0;

  if (!setExists) {
    return { title: "Sticker Stash: Set Unknown" };
  } else return { title: `Sticker Stash: Set ${decodedName}` };
}

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
