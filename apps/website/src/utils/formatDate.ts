export const formatDate = (
  date: string | Date,
  locale: string = "en-US",
  options?: Intl.DateTimeFormatOptions
): string => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString(
    locale,
    options || {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
};

export const formatDateTime = (
  date: string | Date,
  locale: string = "en-US"
): string => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};