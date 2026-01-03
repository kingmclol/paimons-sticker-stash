import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character List",
  description: "List of characters that appeared in Paimon's sticker stash",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid grid-rows-[auto_auto] py-4">{children}</div>
    </div>
  );
}
