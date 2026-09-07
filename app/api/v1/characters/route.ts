import { getCharactersWithStickerIds } from "@/app/utils/queries/characters";
import { CharacterSchema, CharactersQuerySchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(request: NextRequest) {
  const queryObj = Object.fromEntries(request.nextUrl.searchParams);

  const result = CharactersQuerySchema.safeParse(queryObj);
  if (!result.success) {
    return NextResponse.json(z.treeifyError(result.error), { status: 400 });
  }

  const { min_stickers, query } = result.data;

  try {
    const characters = await getCharactersWithStickerIds(query);
    const filteredCharacters = characters.filter(
      (character) =>
        !min_stickers || character.stickers.length >= min_stickers,
    );

    const formattedCharacters = filteredCharacters.map((character) => ({
      ...character,
      main_sticker_id: character.main_sticker_id,
      stickers: character.stickers.map((sticker) => sticker.id),
      num_stickers: character.stickers.length,
    }));

    const validatedCharacers = z
      .array(CharacterSchema)
      .parse(formattedCharacters);

    return NextResponse.json(validatedCharacers, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
