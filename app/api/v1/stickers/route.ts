export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { StickerSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  try {
    const stickers = await prisma.stickers.findMany({
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

    const formattedStickers = stickers.map((sticker) => ({
      ...sticker,
      set: sticker.set.name,
      image_path_stash: sticker.filepath,
      character: sticker.character.name,
    }));

    const validatedStickers = z.array(StickerSchema).parse(formattedStickers);

    return NextResponse.json(validatedStickers, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
