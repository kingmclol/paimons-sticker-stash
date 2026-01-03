import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paimon's Stash",
  description: "List of all Paimon's Painting's sticker sets",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid grid-rows-[auto_auto] py-4">{children}</div>
    </div>
  );
}
