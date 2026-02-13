export default function BatchActions({
  canCompress,
  onCompress,
  busy,
  progressText,
  onDownloadAll,
  onClear
}) {
  return (
    <div className="bg-white dark:bg-zinc-950/40 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p className="text-sm font-extrabold text-zinc-900 dark:text-white">Actions</p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {busy ? progressText : "Compress locally in your browser — no uploads."}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onCompress}
          disabled={!canCompress || busy}
          className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? "Compressing..." : "Compress"}
        </button>

        <button
          onClick={onDownloadAll}
          disabled={busy}
          className="rounded-xl bg-white dark:bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-900 dark:text-white border border-black/10 dark:border-white/10 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download All (ZIP)
        </button>

        <button
          onClick={onClear}
          disabled={busy}
          className="rounded-xl bg-white dark:bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-900 dark:text-white border border-black/10 dark:border-white/10 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
