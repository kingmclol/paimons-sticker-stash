import Image from "next/image";
import Link from "next/link";
import React from "react";

function Card({
  imageSrc,
  subtext,
  href,
  title,
  id,
  children
}: {
  imageSrc: string;
  subtext?: string;
  href?: string;
  title: string;
  id?: number;
  children?: React.ReactNode;
}) {
  const content = (
    <>
      <Image
        src={imageSrc}
        height={128}
        width={128}
        alt={title}
        className="flex-none"
      />
      <div className="flex h-full flex-col justify-around">
        <h3 className="text-xl font-semibold">{title}</h3>
        {subtext && <p>{subtext}</p>}
        {children}
      </div>
      {id ? (
        <p className="absolute right-2 bottom-2 text-sm opacity-50">ID {id}</p>
      ) : null}
    </>
  );
  if (href) {
    return (
      <Link
        href={href}
        className="relative flex h-full items-center gap-4 rounded-lg border p-2"
      >
        {content}
      </Link>
    );
  }
  return (
    <div className="relative flex h-full items-center gap-4 rounded-lg border p-2">
      {content}
    </div>
  );
}

export default Card;
