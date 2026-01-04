import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character List",
  description: "List of characters that appeared in Paimon's sticker stash",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
