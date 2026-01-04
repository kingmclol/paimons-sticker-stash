import {
  characters,
  sticker_sets,
  stickers,
} from "@/app/generated/prisma/client";

export type Character = characters & {
  main_sticker: stickers | null;
  num_stickers: number;
};

export type StickerSet = sticker_sets & {
  main_sticker: stickers | null;
  num_stickers: number;
};

export type Sticker = stickers;
