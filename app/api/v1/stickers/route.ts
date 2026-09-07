import { getStickers } from "@/app/utils/queries/stickers";
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

  const { character_id, set_id, query } = result.data;
  try {
    const stickers = await getStickers({
      characterId: character_id,
      setId: set_id,
    });
    const filteredStickers = query
      ? stickers.filter((sticker) =>
          sticker.full_title.toLowerCase().includes(query.toLowerCase()),
        )
      : stickers;
    const formattedStickers = filteredStickers.map((sticker) => ({
      id: sticker.id,
      title: sticker.title,
      character: sticker.character,
      full_title: sticker.full_title,
      character_id: sticker.character_id,
      set: sticker.set,
      set_id: sticker.set_id,
      image_url_source: sticker.image_url_source,
      image_path_stash: sticker.filepath,
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
