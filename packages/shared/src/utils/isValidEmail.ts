/**
 * Regular expression for validating email addresses.
 */
const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Returns true if the provided email address is valid.
 */
export function isValidEmail(
  email: string
): boolean {
  if (!email) {
    return false;
  }

  return EMAIL_REGEX.test(
    email.trim()
  );
}

/**
 * Normalizes an email address by trimming
 * whitespace and converting it to lowercase.
 */
export function normalizeEmail(
  email: string
): string {
  return email
    .trim()
    .toLowerCase();
}