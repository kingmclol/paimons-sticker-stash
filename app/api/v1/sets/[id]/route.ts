export const dynamicParams = false;
export const dynamic = "force-static";

import prisma from "@/lib/prisma";
import { StickerSetSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

// only static stuff so everything else auto 404
export async function generateStaticParams() {
  const set_ids = await prisma.sticker_sets.findMany({
    select: {
      id: true,
    },
  });

  return set_ids.map((set) => ({ id: set.id.toString() }));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const set = await prisma.sticker_sets.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        release_date: true,
        main_sticker_id: true,
        stickers: {
          select: { id: true },
        },
      },
    });

    if (!set) {
      return NextResponse.json(
        { error: "Sticker set not found" },
        { status: 404 },
      );
    }
    const formattedSet = {
      ...set,
      stickers: set.stickers.map((sticker) => sticker.id),
      release_date: set.release_date?.toISOString().split("T")[0] || null,
      num_stickers: set.stickers.length,
    };
    const validatedSet = StickerSetSchema.parse(formattedSet);
    return NextResponse.json(validatedSet, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
