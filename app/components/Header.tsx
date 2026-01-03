import Link from "next/link";
import Logo from "./Logo";

function Header() {
  return (
    <header className="border-b px-2">
      <ul className="flex justify-between">
        <li className="mr-auto">
          <Logo />
        </li>
        <li className="w-28">
          <Link
            className="flex h-full items-center justify-center hover:bg-slate-700"
            href="/stash"
          >
            Stickers
          </Link>
        </li>
        <li className="w-28">
          <Link
            className="flex h-full items-center justify-center hover:bg-slate-700"
            href="/sets"
          >
            Sets
          </Link>
        </li>
        <li className="w-28">
          <Link
            className="flex h-full items-center justify-center hover:bg-slate-700"
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
