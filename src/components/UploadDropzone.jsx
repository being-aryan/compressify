import { useRef, useState } from "react";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

export default function UploadDropzone({ onFiles }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);

  const pick = () => inputRef.current?.click();

  const handleFiles = (list) => {
    const files = Array.from(list || []);
    onFiles(files, ALLOWED);
  };

  return (
    <div
      className={[
        "w-full rounded-2xl border-2 border-dashed transition",
        "bg-white/70 dark:bg-zinc-950/40",
        drag
          ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10"
          : "border-violet-300/70 dark:border-white/10"
      ].join(" ")}
      onClick={pick}
      onDragEnter={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        handleFiles(e.dataTransfer.files);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? pick() : null)}
      aria-label="Upload images"
    >
      <div className="px-6 py-12 text-center">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-violet-600 dark:text-violet-300">
            <path
              d="M12 16V7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8.5 10.5L12 7l3.5 3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="mt-5 text-lg font-semibold text-zinc-900 dark:text-white">
          Drag & drop images here
        </p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          or click to browse · JPG, PNG, WEBP
        </p>

        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
}
