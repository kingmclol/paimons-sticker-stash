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
  return encodeURIComponent(str.replaceAll(" ", "_")).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

/**
 * Decodes a string from a URL.
 * @param str The string to decode
 * @returns The decoded string
 */
export function decodeFromURL(str: string): string {
  return decodeURIComponent(str.replaceAll("_", " "));
}

/**
 * Get the base URL for the website.
 * First checks for NEXT_PUBLIC_BASE_URL, then for URL (for Netlify) and defaults to http://localhost:3000
 * if neither is set.
 * @returns The base URL for the website
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    // manual override
    return process.env.NEXT_PUBLIC_BASE_URL;
  } else if (process.env.URL) {
    // for netfliy
    return process.env.URL;
  }
  return "http://localhost:3000"; // local
}
