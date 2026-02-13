export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft radial background like your screenshot */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-240px] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-300/60 to-transparent blur-3xl dark:from-violet-500/15" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-20 pb-14">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Compress Images{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>

          <p className="mt-5 text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            Fast, private, and entirely in your browser. No uploads, no servers — just
            smaller files in seconds.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#tool"
              className="inline-flex items-center gap-3 rounded-xl bg-violet-600 px-8 py-3 text-white font-semibold shadow-md hover:bg-violet-700 transition"
            >
              Start Compressing
              <span className="text-white/90">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
