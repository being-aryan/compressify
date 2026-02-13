export default function ControlsPanel({
  quality,
  setQuality,
  format,
  setFormat,
  resizeEnabled,
  setResizeEnabled,
  lockAspect,
  setLockAspect,
  width,
  setWidth,
  height,
  setHeight
}) {
  return (
    <div className="bg-white dark:bg-zinc-950/40 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm p-6">
      <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white">
        Compression Settings
      </h3>

      {/* Quality */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Quality</p>
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{quality}%</p>
        </div>
        <input
          className="mt-3 w-full accent-violet-600"
          type="range"
          min="1"
          max="100"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
        />
      </div>

      {/* Format */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Output Format</p>
        <select
          className="mt-3 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500/30"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WEBP</option>
        </select>
      </div>

      {/* Resize */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Resize</p>

          {/* Toggle */}
          <button
            onClick={() => setResizeEnabled(!resizeEnabled)}
            className={[
              "relative inline-flex h-7 w-12 items-center rounded-full transition",
              resizeEnabled ? "bg-violet-600" : "bg-zinc-200 dark:bg-zinc-700"
            ].join(" ")}
            aria-label="Toggle resize"
          >
            <span
              className={[
                "inline-block h-5 w-5 rounded-full bg-white transition",
                resizeEnabled ? "translate-x-6" : "translate-x-1"
              ].join(" ")}
            />
          </button>
        </div>

        <div className={resizeEnabled ? "mt-4" : "mt-4 opacity-50 pointer-events-none"}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Width</p>
              <input
                className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 px-3 py-2 text-sm outline-none"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="1280"
                inputMode="numeric"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Height</p>
              <input
                className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 px-3 py-2 text-sm outline-none"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="720"
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Lock aspect ratio</p>
            <button
              onClick={() => setLockAspect(!lockAspect)}
              className="text-xs font-semibold text-violet-600 hover:text-violet-700"
            >
              {lockAspect ? "Locked" : "Free"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
