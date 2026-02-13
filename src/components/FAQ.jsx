import { useState } from "react";

const items = [
  {
    q: "How does the compression work?",
    a: "We decode your image in the browser, draw it on a canvas, then re-encode it with your chosen format and quality."
  },
  {
    q: "What file formats are supported?",
    a: "Input: JPG, PNG, WEBP. Output: JPEG, PNG, WEBP."
  },
  {
    q: "Is my data safe?",
    a: "Yes. Your images never leave your device — no backend and no uploads."
  },
  {
    q: "Can I compress multiple images at once?",
    a: "Yes. Batch upload and ZIP download are supported."
  },
  {
    q: "Why did my file size increase after compression?",
    a: "If you output PNG or choose high quality, the file can become larger. Try WEBP/JPEG with lower quality."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-4xl font-extrabold text-center text-zinc-900 dark:text-white">
        Frequently Asked{" "}
        <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
          Questions
        </span>
      </h2>

      <div className="mt-10 max-w-3xl mx-auto space-y-4">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div
              key={it.q}
              className="bg-white dark:bg-zinc-950/40 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {it.q}
                </span>
                <span className="text-zinc-500 dark:text-zinc-300">
                  {isOpen ? "▴" : "▾"}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 text-sm text-zinc-600 dark:text-zinc-300">
                  {it.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
