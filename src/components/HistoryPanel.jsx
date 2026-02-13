import { bytesToSize } from "../utils/format.js";

export default function HistoryPanel({ history }) {
  return (
    <div className="bg-white dark:bg-zinc-950/40 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white">History</h3>
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          Last 10
        </span>
      </div>

      {history.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          No compressions yet.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {history.map((h) => (
            <div
              key={h.id}
              className="rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-50/70 dark:bg-white/5 px-4 py-3"
            >
              <p className="text-sm font-semibold text-zinc-900 dark:text-white break-all">
                {h.name}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {bytesToSize(h.originalSize)} → {bytesToSize(h.compressedSize)} •{" "}
                <span className="font-semibold text-violet-600 dark:text-violet-400">
                  {h.savings}% saved
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
