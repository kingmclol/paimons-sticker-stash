import Image from "next/image";

function LogoImage({ size = 256 }: { size?: number }) {
  return (
    <Image
      height={size}
      width={size}
      src="/stickers/set_1/Icon_Emoji_Paimon's_Paintings_01_Paimon_2.webp"
      alt="Paimon: Ship Out!"
    />
  );
}

export default LogoImage;
