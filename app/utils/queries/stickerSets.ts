import "server-only";

import prisma from "@/lib/prisma";
import { toStickerView } from "./stickers";
import { stickerViewSelect } from "./stickers";
import { StickerSetView } from "@/lib/types";

export async function getStickerSets({
  minStickers,
}: {
  minStickers?: number;
} = {}): Promise<StickerSetView[]> {
  const sets = await prisma.sticker_sets.findMany({
    select: {
      id: true,
      name: true,
      release_date: true,
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

  return sets
    .filter((set) => (minStickers ? set._count.stickers >= minStickers : true))
    .map(({ _count, stickers, ...stickerSet }) => ({
      ...stickerSet,
      num_stickers: _count.stickers,
      stickers: stickers.map(toStickerView),
      main_sticker: stickerSet.main_sticker
        ? toStickerView(stickerSet.main_sticker)
        : null,
    }));
}

export async function getStickerSetById(
  id: number,
): Promise<StickerSetView | null> {
  const stickerSet = await prisma.sticker_sets.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      release_date: true,
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

  if (!stickerSet) {
    return null;
  }

  return {
    ...stickerSet,
    num_stickers: stickerSet._count.stickers,
    stickers: stickerSet.stickers.map(toStickerView),
    main_sticker: stickerSet.main_sticker
      ? toStickerView(stickerSet.main_sticker)
      : null,
  };
}

export async function getStickerSetByName(
  name: string,
): Promise<StickerSetView | null> {
  const stickerSet = await prisma.sticker_sets.findUnique({
    where: { name },
    select: {
      id: true,
      name: true,
      release_date: true,
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

  if (!stickerSet) {
    return null;
  }

  return {
    ...stickerSet,
    num_stickers: stickerSet._count.stickers,
    stickers: stickerSet.stickers.map(toStickerView),
    main_sticker: stickerSet.main_sticker
      ? toStickerView(stickerSet.main_sticker)
      : null,
  };
}
