import Link from "next/link";
import { HiCodeBracketSquare } from "react-icons/hi2";
import LogoImage from "./components/LogoImage";

export default async function Home() {
  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center gap-12 text-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <LogoImage />
        <h1 className="text-4xl font-bold tracking-wide">
          Paimon&apos;s Sticker Stash
        </h1>
      </div>
      <p className="max-w-xl italic">
        A collection of stickers from Genshin Impact, scraped from the Fandom
        Wiki since I want to filter and save them. And uh... that&apos;s about
        it.
      </p>
      <ul className="grid grid-cols-2 gap-8">
        <li>
          <Link
            className="hover:bg-foreground hover:text-background flex items-center justify-center rounded-lg px-8 py-4 font-semibold"
            href="/stash"
          >
            Browse Stickers
          </Link>
        </li>
        <li>
          <Link
            className="hover:bg-foreground hover:text-background flex items-center justify-center rounded-lg px-8 py-4 font-semibold"
            href="/characters"
          >
            Browse Characters
          </Link>
        </li>
        <li>
          <Link
            className="hover:bg-foreground hover:text-background flex items-center justify-center rounded-lg px-8 py-4 font-semibold"
            href="/sets"
          >
            Browse Sets
          </Link>
        </li>
        <li>
          <Link
            className="hover:bg-foreground hover:text-background flex items-center justify-center gap-2 rounded-lg px-8 py-4 font-semibold"
            href="/api"
          >
            <HiCodeBracketSquare size={32}/>
            API Reference
          </Link>
        </li>
        {/* <li>
          <Link
            className="hover:bg-foreground hover:text-background flex items-center justify-center gap-2 rounded-lg px-8 py-4 font-semibold"
            href="https://github.com/kingmclol/paimons-sticker-stash"
            target="_blank"
          >
            <FaGithub />
            Github
          </Link>
        </li> */}
      </ul>
    </div>
  );
}
