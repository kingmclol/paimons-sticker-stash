import { MetadataRoute } from "next";
import { encodeForURL, getBaseUrl } from "./utils/utils";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const [allSets, allCharacters] = await Promise.all([
    prisma.sticker_sets.findMany({
      select: { name: true, updated_at: true },
    }),
    prisma.characters.findMany({
      select: { name: true, updated_at: true },
    }),
  ]);

  const setUrls = allSets.map((set) => ({
    url: `${baseUrl}/sets/${encodeForURL(set.name)}`,
    lastModified: set.updated_at || new Date(),
  }));

  const characterUrls = allCharacters.map((character) => ({
    url: `${baseUrl}/characters/${encodeForURL(character.name)}`,
    lastModified: character.updated_at || new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/characters`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sets`,
      lastModified: new Date(),
    },
    ...setUrls,
    ...characterUrls,
  ];
}
