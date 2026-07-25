/**
 * Truncates a string to the specified maximum length.
 */
export function truncate(
  value: string,
  maxLength = 100,
  suffix = "..."
): string {
  if (!value) {
    return "";
  }

  const text = value.trim();

  if (maxLength <= 0) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return (
    text.slice(
      0,
      maxLength - suffix.length
    ) + suffix
  );
}

/**
 * Truncates a string at the nearest word boundary.
 */
export function truncateWords(
  value: string,
  maxLength = 100,
  suffix = "..."
): string {
  if (!value) {
    return "";
  }

  const text = value.trim();

  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(
    0,
    maxLength
  );

  const lastSpace =
    truncated.lastIndexOf(" ");

  if (lastSpace === -1) {
    return truncate(
      text,
      maxLength,
      suffix
    );
  }

  return (
    truncated.slice(0, lastSpace) +
    suffix
  );
}