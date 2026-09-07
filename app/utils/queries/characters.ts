import "server-only";

import prisma from "@/lib/prisma";
import { CharacterListView, CharacterView } from "@/lib/types";
import { toStickerView } from "./stickers";
import { stickerViewSelect } from "./stickers";

export async function getCharacters(): Promise<CharacterListView[]> {
  const characters = await prisma.characters.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      main_sticker: {
        select: stickerViewSelect,
      },
      _count: {
        select: { stickers: true },
      },
    },
  });

  return characters.map(({ _count, main_sticker, ...character }) => ({
    id: character.id,
    name: character.name,
    description: character.description,
    num_stickers: _count.stickers,
    main_sticker: main_sticker ? toStickerView(main_sticker) : null,
  }));
}

export async function getCharactersWithStickerIds(query?: string) {
  return prisma.characters.findMany({
    where: query
      ? {
          name: {
            contains: query,
          },
        }
      : undefined,
    select: {
      id: true,
      name: true,
      main_sticker_id: true,
      stickers: {
        select: { id: true },
      },
    },
  });
}

export async function getCharacterById(
  id: number,
): Promise<CharacterView | null> {
  const character = await prisma.characters.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      main_sticker: {
        select: stickerViewSelect,
      },
      stickers: {
        select: stickerViewSelect,
      },
      _count: {
        select: { stickers: true },
      },
    },
  });

  if (!character) return null;

  return {
    id: character.id,
    name: character.name,
    description: character.description,
    num_stickers: character._count.stickers,
    main_sticker: character.main_sticker
      ? toStickerView(character.main_sticker)
      : null,
    stickers: character.stickers.map(toStickerView),
  };
}

export async function getCharacterByName(
  name: string,
): Promise<CharacterView | null> {
  const character = await prisma.characters.findUnique({
    where: { name },
    select: {
      id: true,
      name: true,
      description: true,
      main_sticker: {
        select: stickerViewSelect,
      },
      stickers: {
        select: stickerViewSelect,
      },
      _count: {
        select: { stickers: true },
      },
    },
  });

  if (!character) {
    return null;
  }

  return {
    id: character.id,
    name: character.name,
    description: character.description,
    num_stickers: character._count.stickers,
    main_sticker: character.main_sticker
      ? toStickerView(character.main_sticker)
      : null,
    stickers: character.stickers.map(toStickerView),
  };
}
