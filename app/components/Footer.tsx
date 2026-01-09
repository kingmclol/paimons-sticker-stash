import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { HiCodeBracketSquare } from "react-icons/hi2";

function Footer() {
  return (
    <footer className="bg-midground border-foreground/50 flex items-center justify-center gap-4 border-t p-2 font-mono text-sm">
      <Link
        className="text-foreground/50 hover:text-foreground flex items-center justify-center gap-2 px-4 py-2 hover:cursor-pointer hover:underline hover:underline-offset-4"
        href="https://github.com/kingmclol/paimons-sticker-stash"
        target="_blank"
      >
        <FaGithub size={16} />
        Source code
      </Link>
      <Link
        className="text-foreground/50 hover:text-foreground flex items-center justify-center gap-2 px-4 py-2 hover:cursor-pointer hover:underline hover:underline-offset-4"
        href="/api"
        target="_blank"
      >
        <HiCodeBracketSquare size={16} />
        API docs
      </Link>
    </footer>
  );
}

export default Footer;
