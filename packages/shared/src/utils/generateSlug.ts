/**
 * Generates an SEO-friendly slug from a string.
 */
export function generateSlug(
  value: string
): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Validates whether a slug is in the expected format.
 */
export function isValidSlug(
  slug: string
): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
    slug
  );
}

/**
 * Generates a unique slug by appending a numeric suffix
 * if the slug already exists.
 */
export function generateUniqueSlug(
  value: string,
  existingSlugs: string[]
): string {
  const baseSlug = generateSlug(value);

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  let uniqueSlug = `${baseSlug}-${counter}`;

  while (
    existingSlugs.includes(uniqueSlug)
  ) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  return uniqueSlug;
}