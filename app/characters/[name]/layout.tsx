import prisma from "@/lib/prisma";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const charExists =
    (await prisma.characters.count({
      where: { name: params.name },
    })) > 0;

  if (!charExists) {
    return { title: "Unknown Character" };
  } else return { title: params.name };
}
