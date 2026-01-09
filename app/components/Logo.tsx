import Link from "next/link";
import LogoImage from "./LogoImage";

function Logo() {
  return (
    <Link
      href="/"
      className="hover:text-background hover:bg-foreground flex items-center gap-2 px-2"
    >
      <LogoImage size={48} />
      <span>Paimon&apos;s Sticker Stash</span>
    </Link>
  );
}

export default Logo;
