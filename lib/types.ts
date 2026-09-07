import z from "zod";
import { CharacterSchema, StickerSchema, StickerSetSchema } from "./schemas";

export type CharacterView = {
  id: number;
  name: string;
  description: string | null;
  main_sticker: StickerView | null;
  stickers: StickerView[];
  num_stickers: number;
};

export type CharacterListView = Omit<CharacterView, "stickers">;

export type StickerSetView = {
  id: number;
  name: string;
  main_sticker: StickerView | null;
  stickers: StickerView[];
  num_stickers: number;
  release_date: Date | null;
};

export type StickerView = {
  id: number;
  title: string;
  full_title: string;
  filename: string;
  filepath: string;
  image_url_source: string;
  character_id: number;
  character: string;
  set_id: number;
  set: string;
};

export type StickerResponse = z.infer<typeof StickerSchema>;
export type StickerSetResponse = z.infer<typeof StickerSetSchema>;
export type CharacterResponse = z.infer<typeof CharacterSchema>;
