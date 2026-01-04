import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paimon's Stash",
  description: "List of all Paimon's Painting's sticker sets",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return children
}
