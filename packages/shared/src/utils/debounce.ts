/**
 * Creates a debounced version of a function.
 * The function will only execute after the specified
 * delay has elapsed since the last invocation.
 */
export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay = 300
) {
  let timeoutId: ReturnType<typeof setTimeout> | null =
    null;

  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

/**
 * Creates a debounced async function.
 */
export function debounceAsync<
  T extends (...args: any[]) => Promise<any>
>(callback: T, delay = 300) {
  let timeoutId: ReturnType<typeof setTimeout> | null =
    null;

  return (
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>>> =>
    new Promise((resolve, reject) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        try {
          const result = await callback(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
}