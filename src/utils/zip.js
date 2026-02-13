import JSZip from "jszip";
import { extForMime } from "./format.js";

export async function makeZip(items) {
  const zip = new JSZip();
  for (const it of items) {
    if (!it.compressedBlob) continue;
    const ext = extForMime(it.outputMime);
    const safe = (it.name || "image").replace(/\.[^/.]+$/, "");
    const fileName = `compressed_${safe}.${ext}`;
    zip.file(fileName, it.compressedBlob);
  }
  return await zip.generateAsync({ type: "blob" });
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
