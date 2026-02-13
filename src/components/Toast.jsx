import { useEffect } from "react";

export default function Toast({ toasts, removeToast }) {
  useEffect(() => {
    const timers = toasts.map((t) =>
      setTimeout(() => removeToast(t.id), t.ttl ?? 2500)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  return (
    <div
      className="fixed right-4 top-20 z-50 flex w-[min(360px,calc(100%-2rem))] flex-col gap-3"
      aria-live="polite"
      aria-relevant="additions"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-white dark:bg-zinc-950/90 rounded-2xl border border-black/10 dark:border-white/10 shadow-lg px-4 py-3"
          role="status"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-zinc-900 dark:text-white">
                {t.title ?? "Notice"}
              </p>
              {t.message ? (
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {t.message}
                </p>
              ) : null}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="h-8 w-8 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
              aria-label="Dismiss toast"
            >
              ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        }
