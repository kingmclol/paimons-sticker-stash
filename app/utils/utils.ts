import { format } from "date-fns";

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
