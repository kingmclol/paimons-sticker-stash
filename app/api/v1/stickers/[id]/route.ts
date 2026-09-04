export const dynamic = "force-static";
export const dynamicParams = false;
import { getStickerById } from "@/app/utils/queries/stickers";
import prisma from "@/lib/prisma";
import { StickerSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function generateStaticParams() {
  const stickers = await prisma.stickers.findMany({
    select: { id: true },
  });

  return stickers.map((sticker) => ({ id: sticker.id.toString() }));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const sticker = await getStickerById(Number(id));
    if (!sticker) {
      return NextResponse.json({ error: "Sticker not found" }, { status: 404 });
    }

    const formattedSticker = {
      id: sticker.id,
      title: sticker.title,
      character: sticker.character,
      full_title: sticker.full_title,
      character_id: sticker.character_id,
      set: sticker.set,
      set_id: sticker.set_id,
      image_url_source: sticker.image_url_source,
      image_path_stash: sticker.filepath,
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
