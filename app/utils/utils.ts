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
