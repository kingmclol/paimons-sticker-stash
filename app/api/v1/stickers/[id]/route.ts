export const dynamic = "force-static";
export const dynamicParams = false;
import prisma from "@/lib/prisma";
import { StickerSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function generateStaticParams() {
  const sticker_ids = await prisma.stickers.findMany({
    select: {
      id: true,
    },
  });

  return sticker_ids.map((sticker) => ({ id: sticker.id.toString() }));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const sticker = await prisma.stickers.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        character: {
          select: { name: true },
        },
        set: {
          select: { name: true },
        },
        set_id: true,
        image_url_source: true,
        filepath: true,
        character_id: true,
        title: true,
        full_title: true,
      },
    });
    if (!sticker) {
      return NextResponse.json({ error: "Sticker not found" }, { status: 404 });
    }

    const formattedSticker = {
      ...sticker,
      set: sticker.set.name,
      image_path_stash: sticker.filepath,
      character: sticker.character.name,
    };

    const validatedSticker = StickerSchema.parse(formattedSticker);

    return NextResponse.json(validatedSticker, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
