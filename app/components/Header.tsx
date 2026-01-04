import Link from "next/link";
import Logo from "./Logo";

function Header() {
  return (
    <header className="border-b px-2 z-50 sticky top-0 bg-background/75 backdrop-blur-md">
      <ul className="flex justify-between">
        <li className="mr-auto">
          <Logo />
        </li>
        <li className="w-28">
          <Link
            className="flex h-full items-center justify-center hover:bg-foreground hover:text-background"
            href="/stash"
          >
            Stickers
          </Link>
        </li>
        <li className="w-28">
          <Link
            className="flex h-full items-center justify-center hover:bg-foreground hover:text-background"
            href="/sets"
          >
            Sets
          </Link>
        </li>
        <li className="w-28">
          <Link
            className="flex h-full items-center justify-center hover:bg-foreground hover:text-background"
            href="/characters"
          >
            Characters
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
