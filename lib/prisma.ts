import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../app/generated/prisma/client";
import path from "path";

// Idk but I'm very stubborn and don't want to host a server so like I just want some readonly sqlite db is that too hard to ask for

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

let connectionString;
if (process.env.NODE_ENV === "production") {
  connectionString = path.join(process.cwd(), "stickers.db");
} else {
  connectionString = `${process.env.DATABASE_URL}`;
}

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

export { prisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
