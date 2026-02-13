export function bytesToSize(bytes) {
  if (!Number.isFinite(bytes)) return "-";
  const units = ["B", "KB", "MB", "GB"];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  return `${n.toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function calcSavings(origBytes, newBytes) {
  if (!origBytes || !newBytes) return 0;
  const saved = origBytes - newBytes;
  return Math.max(0, Math.round((saved / origBytes) * 100));
}

export function extForMime(mime) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "img";
}

export function mimeFromFormat(format) {
  if (format === "jpeg") return "image/jpeg";
  if (format === "png") return "image/png";
  return "image/webp";
}
