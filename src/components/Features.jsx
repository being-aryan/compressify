function Card({ icon, title, desc }) {
  return (
    <div className="bg-white dark:bg-zinc-950/40 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm p-6 text-center">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="mt-4 font-extrabold text-zinc-900 dark:text-white">{title}</p>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{desc}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-4xl font-extrabold text-center text-zinc-900 dark:text-white">
        Why{" "}
        <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
          Compressify
        </span>
        ?
      </h2>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          icon="🛡️"
          title="100% Private"
          desc="Images never leave your browser. No server uploads, ever."
        />
        <Card
          icon="⚡"
          title="Lightning Fast"
          desc="Canvas-powered compression delivers results in milliseconds."
        />
        <Card
          icon="📦"
          title="Batch Processing"
          desc="Compress multiple images at once and download as ZIP."
        />
        <Card
          icon="📶"
          title="Works Offline"
          desc="No internet required. Everything runs locally on your device."
        />
      </div>
    </section>
  );
}
