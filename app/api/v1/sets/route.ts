export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { StickerSetSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  try {
    const sets = await prisma.sticker_sets.findMany({
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

    const formattedSets = sets.map((set) => ({
      ...set,
      stickers: set.stickers.map((sticker) => sticker.id),
      release_date: set.release_date?.toISOString().split("T")[0] || null,
      num_stickers: set.stickers.length,
    }));
    const validatedSets = z.array(StickerSetSchema).parse(formattedSets);
    return NextResponse.json(validatedSets, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
