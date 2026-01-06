import prisma from "@/lib/prisma";
import { CharacterSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    const character = await prisma.characters.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        main_sticker_id: true,
        stickers: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!character) {
      return NextResponse.json(
        { error: "Character not found" },
        { status: 404 },
      );
    }

    const formattedCharacters = {
      ...character,
      stickers: character.stickers.map((sticker) => sticker.id),
      num_stickers: character.stickers.length,
    };
    const validatedCharacers = CharacterSchema.parse(formattedCharacters);
    return NextResponse.json(validatedCharacers, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
