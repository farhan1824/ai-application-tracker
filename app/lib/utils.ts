/**
 * Converts bytes to a human-readable size format
 * @param bytes - The number of bytes to format
 * @param decimals - Number of decimal places to show (default: 2)
 * @returns Human-readable file size string (e.g., "2.5 MB")
 */
export function formatSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * Math.pow(10, decimals)) / Math.pow(10, decimals) + " " + sizes[i];
}


export function generateUUID(): string {
  return crypto.randomUUID();
}