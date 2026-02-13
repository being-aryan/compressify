import DarkModeToggle from "./DarkModeToggle.jsx";

function LogoIcon() {
  return (
    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-md">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="text-white"
      >
        <path
          d="M13 2L3 14h7l-1 8 12-16h-7l-1-4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function Navbar({ theme, toggleTheme }) {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-white/80 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-black/5 dark:border-white/10 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          {/* Left: Brand */}
          <a href="#top" className="flex items-center gap-3">
            <LogoIcon />
            <span className="text-lg font-extrabold text-violet-600 dark:text-violet-400">
              Compressify
            </span>
          </a>

          {/* Center: Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            <a href="#features" className="hover:text-zinc-900 dark:hover:text-white">
              Features
            </a>
            <a href="#tool" className="hover:text-zinc-900 dark:hover:text-white">
              Tool
            </a>
            <a href="#faq" className="hover:text-zinc-900 dark:hover:text-white">
              FAQ
            </a>
          </nav>

          {/* Right: Theme */}
          <div className="flex items-center gap-2">
            <DarkModeToggle theme={theme} toggle={toggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
}
