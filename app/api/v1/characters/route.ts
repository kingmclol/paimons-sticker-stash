import prisma from "@/lib/prisma";
import { CharacterSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  try {
    const characters = await prisma.characters.findMany({
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
    const formattedCharacters = characters.map((character) => ({
      ...character,
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
