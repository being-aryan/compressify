import { bytesToSize, calcSavings, extForMime } from "../utils/format.js";

export default function ImageCard({ item, onDownload }) {
  const savings = calcSavings(item.originalSize, item.compressedSize);

  const chip = (label) => (
    <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
      {label}
    </span>
  );

  return (
    <div className="bg-white dark:bg-zinc-950/40 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm p-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div>
          <p className="text-sm font-extrabold text-zinc-900 dark:text-white break-all">
            {item.name}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {chip(item.type.replace("image/", "").toUpperCase())}
            {chip(`Original: ${bytesToSize(item.originalSize)}`)}
            {item.compressedBlob ? chip(`Compressed: ${bytesToSize(item.compressedSize)}`) : null}
            {item.compressedBlob ? chip(`Saved: ${savings}%`) : null}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onDownload(item)}
            disabled={!item.compressedBlob}
          >
            Download
          </button>
        </div>
      </div>

      {/* Previews */}
      <div className="mt-5 grid md:grid-cols-2 gap-4">
        {/* Original */}
        <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-50/70 dark:bg-white/5 overflow-hidden">
          <div className="px-4 py-3 border-b border-black/5 dark:border-white/10">
            <p className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Original</p>
          </div>
                    <div className="h-56 flex items-center justify-center p-3">
                      <img
                        src={item.originalUrl}
                        alt={`Original ${item.name}`}
                      />
                    </div>
                  </div>
          
                  {/* Compressed */}
                  <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-50/70 dark:bg-white/5 overflow-hidden">
                    <div className="px-4 py-3 border-b border-black/5 dark:border-white/10">
                      <p className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Compressed</p>
                    </div>
                    <div className="h-56 flex items-center justify-center p-3">
                      {item.compressedBlob ? (
                        <img
                          src={URL.createObjectURL(item.compressedBlob)}
                          alt={`Compressed ${item.name}`}
                        />
                      ) : (
                        <p className="text-sm text-zinc-400">Compress image to preview</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
