import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { StickerSchema, StickersQuerySchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(request: NextRequest) {
  const queryObj = Object.fromEntries(request.nextUrl.searchParams);
  console.log(queryObj);
  const result = StickersQuerySchema.safeParse(queryObj);
  if (!result.success) {
    return NextResponse.json(z.treeifyError(result.error), { status: 400 });
  }

  const { character_id, set_id, query } = queryObj;
  const where: Prisma.stickersWhereInput = {};

  if (character_id) {
    where.character_id = Number(character_id);
  }
  if (set_id) {
    where.set_id = Number(set_id);
  }
  // Seems like SQLite doesn't allow for insensitive search...
  // if (query) {
  //   where.full_title = { contains: query, mode: "insensitive" };
  // }
  console.log(where);
  try {
    const stickers = await prisma.stickers
      .findMany({
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
        where: where,
      })
      .then((data) =>
        data.filter((sticker) =>
          query
            ? sticker.full_title.toLowerCase().includes(query.toLowerCase())
            : true,
        ),
      );

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
