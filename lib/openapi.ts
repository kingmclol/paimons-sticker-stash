import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import z from "zod";
import { CharacterSchema, StickerSchema, StickerSetSchema } from "./schemas";

export const registry = new OpenAPIRegistry();

registry.register("Sticker Set", StickerSetSchema);
registry.register("Character", CharacterSchema);
registry.register("Sticker", StickerSchema);

// GET /api/sets/{id}
registry.registerPath({
  method: "get",
  path: "sets/{id}",
  summary: "Get a single sticker set by ID",
  request: {
    params: z.object({
      id: z.string().openapi({ example: "1" }),
    }),
  },
  responses: {
    200: {
      description: "The sticker set",
      content: {
        "application/json": {
          schema: StickerSetSchema,
        },
      },
    },
    404: {
      description: "Sticker set not found",
    },
  },
});

// GET /api/sets
registry.registerPath({
  method: "get",
  path: "sets",
  summary: "Get all sticker sets",
  responses: {
    200: {
      description: "List of sticker set objects",
      content: {
        "application/json": {
          schema: StickerSetSchema.array(),
        },
      },
    },
    404: {
      description: "Sticker sets not found",
    },
  },
});

// GET /api/characters
registry.registerPath({
  method: "get",
  path: "characters",
  summary: "Get all characters",
  responses: {
    200: {
      description: "List of character objects",
      content: {
        "application/json": {
          schema: CharacterSchema.array(),
        },
      },
    },
    404: {
      description: "Characters not found",
    },
  },
});

// GET /api/characters/{id}
registry.registerPath({
  method: "get",
  path: "characters/{id}",
  summary: "Get a single character by ID",
  request: {
    params: z.object({
      id: z.string().openapi({ example: "1" }),
    }),
  },
  responses: {
    200: {
      description: "The character object",
      content: {
        "application/json": {
          schema: CharacterSchema,
        },
      },
    },
    404: {
      description: "Character not found",
    },
  },
});

// GET /api/stickers/{id}
registry.registerPath({
  method: "get",
  path: "stickers/{id}",
  summary: "Get a single sticker by ID",
  request: {
    params: z.object({
      id: z.string().openapi({ example: "1" }),
    }),
  },
  responses: {
    200: {
      description: "The sticker object",
      content: {
        "application/json": {
          schema: StickerSchema,
        },
      },
    },
    404: {
      description: "Sticker not found",
    },
  },
});

// GET /api/stickers
registry.registerPath({
  method: "get",
  path: "stickers",
  summary: "Get all stickers",
  responses: {
    200: {
      description: "Array of sticker objects",
      content: {
        "application/json": {
          schema: StickerSchema.array(),
        },
      },
    },
    404: {
      description: "Character not found",
    },
  },
});

export function getApiSpec() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Paimon's Sticker Stash API",
      version: "1.0.0",
      description: "API for browsing Paimon's Sticker Stash.",
    },
    servers: [
      {
        url: "/api/v1",
      },
    ],
  });
}
