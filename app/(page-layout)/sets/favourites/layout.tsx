import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Sticker Stash",
  description: "Manage a sticker stash of your own. Collect them all! Or just your favourites. It's up to you!",
  alternates: {
    canonical: "/sets/favourites",
  }
};

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
