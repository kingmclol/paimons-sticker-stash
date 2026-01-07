import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const StickerSchema = z.object({
  id: z.int().positive().openapi({
    example: 10,
  }),
  title: z.string().openapi({
    description:
      'The title of the sticker. "Unknown" if not found during scraping.',
    example: "Ship out!",
  }),
  character: z.string().openapi({
    description:
      'The character involved in the sticker. "Unknown" if not found during scraping.',
    example: "Paimon",
  }),
  full_title: z.string().openapi({
    description: "The full sticker title.",
    example: "Paimon: Ship out!",
  }),
  character_id: z.int().positive().openapi({
    description:
      'The ID of the character this sticker belongs to. May refer to the \"Unknown\" character.',
    example: 5,
  }),
  set: z.string().openapi({
    description: "The name of the sticker set this sticker belongs to.",
    example: "1",
  }),
  set_id: z.int().positive().openapi({
    description: "The ID of the sticker set this sticker belongs to.",
    example: 1,
  }),
  image_url_source: z.string().url().openapi({
    description:
      "The original, no-BS source URL of the sticker image, scraped from the Fandom Wiki.",
    example:
      "https://static.wikia.nocookie.net/gensin-impact/images/5/55/Icon_Emoji_Paimon%27s_Paintings_01_Paimon_2.png",
  }),
  image_path_stash: z.string().openapi({
    description:
      "The RELATIVE path of the sticker image stored in Paimon's Sticker Stash. You will need to prepend the base URL to access the image.",
    example: "/stickers/set_1/Icon_Emoji_Paimon's_Paintings_01_Paimon_2.webp",
  }),
});

export const StickerSetSchema = z.object({
  id: z.int().positive().openapi({
    example: 1,
  }),
  name: z.string().openapi({
    description: "The name of the sticker set.",
    examples: ["1", "OnePlus"],
  }),
  release_date: z.string().nullable().openapi({
    description:
      "The release date as YYYY-MM-DD format of the sticker set. Null if unknown.",
    example: "2021-10-20",
  }),
  main_sticker_id: z.int().positive().nullable().openapi({
    description:
      "The ID of the main sticker representing this sticker set. May be Null.",
    example: 10,
  }),
  num_stickers: z.int().nonnegative().openapi({
    description: "The number of stickers in this sticker set.",
    example: 12,
  }),
  stickers: z.array(z.int().positive()).openapi({
    description: "The IDs of the stickers in this sticker set.",
    example: [10, 11, 12],
  }),
});

export const CharacterSchema = z.object({
  id: z.int().positive().openapi({
    example: 5,
  }),
  name: z.string().openapi({
    description:
      'The name of the character. Note that "Unknown" is the catch-all character.',
    example: "Paimon",
  }),
  main_sticker_id: z.int().positive().nullable().openapi({
    description:
      "The ID of the main sticker representing this character. May be Null.",
    example: 5,
  }),
  num_stickers: z.int().nonnegative().openapi({
    description: "The number of stickers associated with this character.",
    example: 12,
  }),
  stickers: z.array(z.int().positive()).openapi({
    description: "The IDs of the stickers associated with this character.",
    example: [5, 9, 10, 11, 12, 13],
  }),
});

export const StickersQuerySchema = z.object({
  character_id: z.coerce.number().int().positive().optional().openapi({
    description:
      "Restrict stickers to those belonging to character with this ID.",
    example: 5,
  }),
  set_id: z.coerce.number().int().positive().optional().openapi({
    description: "Restrict stickers to those belonging to set with this ID.",
    example: 1,
  }),
  query: z
    .string()
    .optional()
    .openapi({
      description:
        "Restrict stickers to those with full titles containing this query, case insensitive.",
      examples: ["time", "Paim", "happy"],
    }),
});

export const CharactersQuerySchema = z.object({
  min_stickers: z.coerce.number().int().nonnegative().optional().openapi({
    description:
      "Restrict characters to those with at least this many stickers.",
    example: 5,
  }),
});

export const StickerSetsQuerySchema = z.object({
  min_stickers: z.coerce.number().int().nonnegative().optional().openapi({
    description: "Restrict sets to those with at least this many stickers. Not particularly useful in hindsight but whatever.",
    example: 20,
  }),
});
