import { format } from "date-fns";

/**
 * Converts an image blob to png format. Used to normalize filetype for writing to clipboard
 * GPT generated since not really sure but seems to work on firefox and chrome at least
 * @param blob Image blob that is not png
 * @returns blob but png blob
 */
export async function convertToPng(blob: Blob): Promise<Blob> {
    if (blob.type !== "image/png") {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(blob);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      const pngDataUrl = canvas.toDataURL("image/png");
      const res = await fetch(pngDataUrl);
      blob = await res.blob();

      URL.revokeObjectURL(img.src);
    }
    return blob;
}
/**
 * Formats a date to a readable string.
 * @param date The date to format
 * @returns The date formatted as MMMM d, yyyy (e.g., March 7, 1990). Returns "Unknown Date" if null or undefined
 */
export function formatDate(date: Date | null | undefined): string {
  if (!date) {
    return "Unknown Date";
  }
  return format(date, "MMMM d, yyyy");
}

/**
 * Encodes a string for use in a URL.
 * @param str The string to encode
 * @returns The encoded string
 */
export function encodeForURL(str: string): string {
  return encodeURIComponent(str.replaceAll(" ", "_"));
}

/**
 * Decodes a string from a URL.
 * @param str The string to decode
 * @returns The decoded string
 */
export function decodeFromURL(str: string): string {
  return decodeURIComponent(str.replaceAll("_", " "));
}
