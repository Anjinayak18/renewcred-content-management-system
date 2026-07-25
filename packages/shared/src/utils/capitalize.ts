/**
 * Capitalizes the first character of a string.
 */
export function capitalize(
  value: string
): string {
  if (!value.trim()) {
    return "";
  }

  const normalized = value.trim();

  return (
    normalized.charAt(0).toUpperCase() +
    normalized.slice(1)
  );
}

/**
 * Capitalizes the first character of every word.
 */
export function capitalizeWords(
  value: string
): string {
  if (!value.trim()) {
    return "";
  }

  return value
    .trim()
    .split(/\s+/)
    .map((word) => capitalize(word))
    .join(" ");
}

/**
 * Converts a string to title case.
 */
export function toTitleCase(
  value: string
): string {
  return capitalizeWords(
    value.toLowerCase()
  );
}