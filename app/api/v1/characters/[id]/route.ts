import { getCharacterById } from "@/app/utils/queries/characters";
import { CharacterSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const character = await getCharacterById(Number(id));

    if (!character) {
      return NextResponse.json(
        { error: "Character not found" },
        { status: 404 },
      );
    }

    const formattedCharacter = {
      id: character.id,
      name: character.name,
      main_sticker_id: character.main_sticker?.id || null,
      stickers: character.stickers.map((sticker) => sticker.id),
      num_stickers: character.stickers.length,
    };
    const validatedCharacter = CharacterSchema.parse(formattedCharacter);
    return NextResponse.json(validatedCharacter, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
