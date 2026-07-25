export interface FormatDateOptions {
  locale?: string;
  dateStyle?: "full" | "long" | "medium" | "short";
  timeStyle?: "full" | "long" | "medium" | "short";
}

export function formatDate(
  value: string | number | Date,
  options: FormatDateOptions = {}
): string {
  const {
    locale = "en-US",
    dateStyle = "medium",
    timeStyle
  } = options;

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    ...(timeStyle ? { timeStyle } : {})
  }).format(date);
}

export function formatDateTime(
  value: string | number | Date,
  locale = "en-US"
): string {
  return formatDate(value, {
    locale,
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export function formatRelativeDate(
  value: string | number | Date
): string {
  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const now = new Date();
  const difference =
    now.getTime() - date.getTime();

  const seconds = Math.floor(
    difference / 1000
  );

  const minutes = Math.floor(
    seconds / 60
  );

  const hours = Math.floor(
    minutes / 60
  );

  const days = Math.floor(
    hours / 24
  );

  if (seconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} minute${
      minutes === 1 ? "" : "s"
    } ago`;
  }

  if (hours < 24) {
    return `${hours} hour${
      hours === 1 ? "" : "s"
    } ago`;
  }

  if (days < 30) {
    return `${days} day${
      days === 1 ? "" : "s"
    } ago`;
  }

  return formatDate(date);
}