import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Sticker Stash",
  description: "Manage your own sticker stash.",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
