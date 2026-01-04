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
  const charExists =
    (await prisma.characters.count({
      where: { name: decodedName },
    })) > 0;

  if (!charExists) {
    return { title: "Sticker Stash: Unknown" };
  } else return { title: `Sticker Stash: ${decodedName}` };
}

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
