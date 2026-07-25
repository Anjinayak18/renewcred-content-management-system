/**
 * Delays execution for the specified duration.
 *
 * @param milliseconds Duration to wait before resolving.
 * @returns Promise<void>
 */
export function sleep(
  milliseconds: number
): Promise<void> {
  const delay = Math.max(0, milliseconds);

  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/**
 * Sleeps for a random duration between the
 * provided minimum and maximum values.
 *
 * Useful for:
 * - Retry backoff
 * - Demo simulations
 * - Mock network latency
 */
export async function randomSleep(
  minMilliseconds = 100,
  maxMilliseconds = 1000
): Promise<void> {
  const min = Math.max(0, minMilliseconds);
  const max = Math.max(min, maxMilliseconds);

  const delay =
    Math.floor(
      Math.random() * (max - min + 1)
    ) + min;

  await sleep(delay);
}

/**
 * Retries an asynchronous operation with
 * a delay between attempts.
 */
export async function retry<T>(
  operation: () => Promise<T>,
  retries = 3,
  delayMilliseconds = 1000
): Promise<T> {
  let lastError: unknown;

  for (
    let attempt = 1;
    attempt <= retries;
    attempt++
  ) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt < retries) {
        await sleep(delayMilliseconds);
      }
    }
  }

  throw lastError;
}