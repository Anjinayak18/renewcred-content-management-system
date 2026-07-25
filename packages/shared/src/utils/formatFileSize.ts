const FILE_SIZE_UNITS = [
  "Bytes",
  "KB",
  "MB",
  "GB",
  "TB",
  "PB"
] as const;

export interface FormatFileSizeOptions {
  decimals?: number;
}

export function formatFileSize(
  bytes: number,
  options: FormatFileSizeOptions = {}
): string {
  const { decimals = 2 } = options;

  if (!Number.isFinite(bytes)) {
    return "Invalid Size";
  }

  if (bytes < 0) {
    return "Invalid Size";
  }

  if (bytes === 0) {
    return "0 Bytes";
  }

  const base = 1024;

  const unitIndex = Math.min(
    Math.floor(
      Math.log(bytes) / Math.log(base)
    ),
    FILE_SIZE_UNITS.length - 1
  );

  const size =
    bytes / Math.pow(base, unitIndex);

  const formattedSize = Number(
    size.toFixed(decimals)
  );

  return `${formattedSize} ${
    FILE_SIZE_UNITS[unitIndex]
  }`;
}

export function formatUploadProgress(
  uploadedBytes: number,
  totalBytes: number
): string {
  if (
    totalBytes <= 0 ||
    !Number.isFinite(totalBytes)
  ) {
    return "0%";
  }

  const percentage = Math.min(
    100,
    Math.max(
      0,
      (uploadedBytes / totalBytes) * 100
    )
  );

  return `${percentage.toFixed(0)}%`;
}