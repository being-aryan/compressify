export default function DarkModeToggle({ theme, toggle }) {
  return (
    <button
      onClick={toggle}
      className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <span className="text-lg">🌙</span>
      ) : (
        <span className="text-lg">☀️</span>
      )}
    </button>
  );
}
