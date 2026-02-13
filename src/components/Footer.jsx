export default function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto max-w-9xl px-4">
        <div className="glass rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/80 font-semibold">{"<Compressify/>"}</div>
          <div className="text-white/55 text-sm">
            © 2026 Aryan Tiwari. Built with Javascript and React.
          </div>
          <div className="flex gap-3">
            <a className="text-white/60 hover:text-white transition" href="https://github.com/being-aryan" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}