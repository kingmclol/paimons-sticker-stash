import prisma from "@/lib/prisma";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { name } = await params;
  const setExists =
    (await prisma.sticker_sets.count({
      where: { name: name },
    })) > 0;

  if (!setExists) {
    return { title: "Sticker Stash: Set Unknown" };
  } else return { title: `Sticker Stash: Set ${name}` };
}

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
