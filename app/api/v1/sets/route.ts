import prisma from "@/lib/prisma";
import { StickerSetSchema, StickerSetsQuerySchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(request: NextRequest) {
  const queryObj = Object.fromEntries(request.nextUrl.searchParams);

  const result = StickerSetsQuerySchema.safeParse(queryObj);
  if (!result.success) {
    return NextResponse.json(z.treeifyError(result.error), { status: 400 });
  }

  const { min_stickers } = queryObj;

  try {
    const sets = await prisma.sticker_sets
      .findMany({
        select: {
          id: true,
          name: true,
          release_date: true,
          main_sticker_id: true,
          stickers: {
            select: { id: true },
          },
        },
      })
      .then((data) =>
        data.filter(
          (set) => !min_stickers || set.stickers.length > Number(min_stickers),
        ),
      );

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
