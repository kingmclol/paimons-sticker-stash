import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paimon's Stash",
  description: "A list of all sticker sets Paimon has painted so far!",
  alternates: {
    canonical: "/sets"
  }
};

export default function layout({ children }: { children: React.ReactNode }) {
  return children
}
