import { clamp, mimeFromFormat } from "./format.js";

/**
 * Decode file to bitmap-like object.
 * Prefers createImageBitmap for speed; falls back to Image().
 */
export async function decodeImage(file) {
  const url = URL.createObjectURL(file);
  try {
    if ("createImageBitmap" in window) {
      const bmp = await createImageBitmap(file);
      return { kind: "bitmap", bitmap: bmp, url };
    }
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Failed to load image"));
      el.src = url;
    });
    return { kind: "image", image: img, url };
  } catch (e) {
    URL.revokeObjectURL(url);
    throw e;
  }
}

function getSourceSize(decoded) {
  if (decoded.kind === "bitmap") return { w: decoded.bitmap.width, h: decoded.bitmap.height };
  return { w: decoded.image.naturalWidth, h: decoded.image.naturalHeight };
}

function drawToCanvas(decoded, canvas, targetW, targetH) {
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d", { alpha: true });

  // Clear for PNG transparency correctness
  ctx.clearRect(0, 0, targetW, targetH);

  if (decoded.kind === "bitmap") {
    ctx.drawImage(decoded.bitmap, 0, 0, targetW, targetH);
  } else {
    ctx.drawImage(decoded.image, 0, 0, targetW, targetH);
  }
}

export async function compressFile({
  file,
  quality,
  format,
  resizeEnabled,
  targetWidth,
  targetHeight
}) {
  const decoded = await decodeImage(file);
  const { w: srcW, h: srcH } = getSourceSize(decoded);

  // Decide output size
  let outW = srcW;
  let outH = srcH;

  if (resizeEnabled) {
    const w = Number(targetWidth);
    const h = Number(targetHeight);
    if (Number.isFinite(w) && w > 0) outW = Math.round(w);
    if (Number.isFinite(h) && h > 0) outH = Math.round(h);

    // Avoid absurdly huge canvases
    outW = clamp(outW, 1, 12000);
    outH = clamp(outH, 1, 12000);
  }

  const canvas = document.createElement("canvas");
  drawToCanvas(decoded, canvas, outW, outH);

  const mime = mimeFromFormat(format);
  const q = clamp(Number(quality) / 100, 0.01, 1);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Compression failed"))),
      mime,
      // PNG ignores quality; JPEG/WEBP use it.
      mime === "image/png" ? undefined : q
    );
  });

  // Cleanup decoded
  try {
    if (decoded.kind === "bitmap") decoded.bitmap.close?.();
  } catch {
    // ignore
  }
  URL.revokeObjectURL(decoded.url);

  return {
    blob,
    outW,
    outH,
    mime
  };
}
