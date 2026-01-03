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

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid grid-rows-[auto_auto] py-4">{children}</div>
    </div>
  );
}
