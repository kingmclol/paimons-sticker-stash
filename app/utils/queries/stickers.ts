import "server-only";

import prisma from "@/lib/prisma";
import { StickerView } from "@/lib/types";
import { Prisma } from "@/app/generated/prisma/client";

export const stickerViewSelect = {
  id: true,
  title: true,
  set_id: true,
  filename: true,
  image_url_source: true,
  character_id: true,
  character: {
    select: {
      name: true,
    },
  },
  set: {
    select: {
      name: true,
    },
  },
} satisfies Prisma.stickersSelect;

export type StickerViewRow = Prisma.stickersGetPayload<{
  select: typeof stickerViewSelect;
}>;

export function toStickerView(sticker: StickerViewRow): StickerView {
  return {
    id: sticker.id,
    title: sticker.title,
    set_id: sticker.set_id,
    filename: sticker.filename,
    filepath: `/stickers/set_${sticker.set.name}/${sticker.filename}`,
    image_url_source: sticker.image_url_source,
    character_id: sticker.character_id,
    character: sticker.character.name,
    set: sticker.set.name,
    full_title: `${sticker.character.name}: ${sticker.title}`,
  };
}
export async function getStickers({
  setId,
  characterId,
}: {
  setId?: number;
  characterId?: number;
} = {}): Promise<StickerView[]> {
  const stickers = await prisma.stickers.findMany({
    select: stickerViewSelect,
    where: {
      ...(setId !== undefined && { set_id: setId }),
      ...(characterId !== undefined && { character_id: characterId }),
    },
  });

  return stickers.map(toStickerView);
}

export async function getStickerById(id: number): Promise<StickerView | null> {
  const sticker = await prisma.stickers.findUnique({
    where: { id },
    select: stickerViewSelect,
  });

  return sticker ? toStickerView(sticker) : null;
}
