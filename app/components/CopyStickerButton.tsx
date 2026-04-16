import { Sticker } from "@/lib/types";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  HiOutlineClipboardDocument,
  HiOutlineClipboardDocumentCheck
} from "react-icons/hi2";
import { convertToPng } from "../utils/utils";

// Can probably merge with Star into generic StickerAction which has a render prop and own click handler
// TODO: add better UI indication if filepath not exist (or use the image source url instead, althought then resizing won't be possible using next image)

function CopyStickerButton({
  sticker,
  size = 32,
  copyIndicatorTimeout = 2000,
}: {
  sticker: Sticker;
  size?: number;
  copyIndicatorTimeout?: number;
}) {
  const [copied, setCopied] = useState(false);
  const handleClick = async () => {
    try {
      if (!sticker.filepath) {
        throw new Error("Sticker image not found..?");
      }
      const response = await fetch(sticker.filepath);
      let blob = await response.blob();
      if (!ClipboardItem.supports(blob.type)) {
        // If it doesn't support writing original format try convert to png
        blob = await convertToPng(blob);
        if (!ClipboardItem.supports(blob.type)) {
          throw new Error("Unsupported image format");
        }
      }
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setTimeout(() => setCopied(false), copyIndicatorTimeout);
      toast.success(`Copied ${sticker.full_title}`);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy sticker image:", error);
      toast.error(`Failed to copy: ${error}`);
      return;
    }
  };
  return (
    <button
      className="bg-background flex items-center justify-center rounded-lg opacity-80 hover:cursor-pointer hover:opacity-100"
      onClick={handleClick}
      aria-label={copied ? "Copied!" : "Copy sticker"}
    >
      {copied ? (
        <HiOutlineClipboardDocumentCheck size={size} />
      ) : (
        <HiOutlineClipboardDocument size={size} />
      )}
    </button>
  );
}

export default CopyStickerButton;
