import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import UploadDropzone from "./components/UploadDropzone.jsx";
import ControlsPanel from "./components/ControlsPanel.jsx";
import ImageCard from "./components/ImageCard.jsx";
import BatchActions from "./components/BatchActions.jsx";
import HistoryPanel from "./components/HistoryPanel.jsx";
import Features from "./components/Features.jsx";
import FAQ from "./components/FAQ.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";

import { compressFile } from "./utils/image.js";
import { calcSavings, extForMime } from "./utils/format.js";
import { makeZip, downloadBlob } from "./utils/zip.js";
import { getSavedTheme, setSavedTheme } from "./utils/storage.js";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default function App() {
  // Theme
  const [theme, setTheme] = useState(getSavedTheme());
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    setSavedTheme(theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Toasts
  const [toasts, setToasts] = useState([]);
  const pushToast = (title, message, ttl = 2500) => {
    const id = uid();
    setToasts((p) => [...p, { id, title, message, ttl }]);
  };
  const removeToast = useCallback((id) => {
    setToasts((p) => p.filter((t) => t.id !== id));
  }, []);

  // Controls
  const [quality, setQuality] = useState(63);
  const [format, setFormat] = useState("jpeg"); // jpeg | png | webp
  const [resizeEnabled, setResizeEnabled] = useState(false);
  const [lockAspect, setLockAspect] = useState(true);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  // Images
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);

  // Busy / progress
  const [busy, setBusy] = useState(false);
  const [progressText, setProgressText] = useState("");

  const onFiles = (files, allowedSet) => {
    const good = [];
    const bad = [];
    for (const f of files) (allowedSet.has(f.type) ? good : bad).push(f);

    if (bad.length) pushToast("Unsupported", "Use JPG / PNG / WEBP only.");

    const mapped = good.map((f) => ({
      id: uid(),
      file: f,
      name: f.name,
      type: f.type,
      originalSize: f.size,
      originalUrl: URL.createObjectURL(f),
      compressedBlob: null,
      compressedUrl: "",
      compressedSize: 0,
      outputMime: ""
    }));

    if (mapped.length) {
      setItems((prev) => [...prev, ...mapped]);
      pushToast("Added", `${mapped.length} image(s) added`);
    }
  };

  const clearAll = () => {
    for (const it of items) {
      try { if (it.originalUrl) URL.revokeObjectURL(it.originalUrl); } catch {}
      try { if (it.compressedUrl) URL.revokeObjectURL(it.compressedUrl); } catch {}
    }
    setItems([]);
    pushToast("Cleared", "All images removed");
  };

  const downloadOne = (it) => {
    if (!it.compressedBlob) return;
    const ext = extForMime(it.outputMime);
    const base = it.name.replace(/\.[^/.]+$/, "");
    downloadBlob(it.compressedBlob, `compressed_${base}.${ext}`);
  };

  const downloadAllZip = async () => {
    const ready = items.filter((i) => i.compressedBlob);
    if (!ready.length) return pushToast("Nothing", "Compress images first");

    try {
      setBusy(true);
      setProgressText("Preparing ZIP…");
      const zipBlob = await makeZip(ready);
      downloadBlob(zipBlob, "compressify_compressed_images.zip");
      pushToast("Downloaded", "ZIP ready");
    } catch (e) {
      pushToast("ZIP failed", e?.message ?? "Could not create ZIP");
    } finally {
      setBusy(false);
      setProgressText("");
    }
  };

  const compressAll = async () => {
    if (!items.length) return;

    setBusy(true);
    try {
      const newItems = [...items];

      for (let i = 0; i < newItems.length; i++) {
        setProgressText(`Compressing ${i + 1} / ${newItems.length}…`);

        const it = newItems[i];
        const out = await compressFile({
          file: it.file,
          quality,
          format,
          resizeEnabled,
          targetWidth: width,
          targetHeight: height
        });

        if (it.compressedUrl) {
          try { URL.revokeObjectURL(it.compressedUrl); } catch {}
        }

        const compressedUrl = URL.createObjectURL(out.blob);

        newItems[i] = {
          ...it,
          compressedBlob: out.blob,
          compressedUrl,
          compressedSize: out.blob.size,
          outputMime: out.mime
        };

        setItems([...newItems]);

        const h = {
          id: uid(),
          name: it.name,
          originalSize: it.originalSize,
          compressedSize: out.blob.size,
          savings: calcSavings(it.originalSize, out.blob.size)
        };
        setHistory((prev) => [h, ...prev].slice(0, 10));
      }

      pushToast("Done", "Compression complete");
    } catch (e) {
      pushToast("Error", e?.message ?? "Compression failed");
    } finally {
      setBusy(false);
      setProgressText("");
    }
  };

  const stats = useMemo(() => {
    const totalOrig = items.reduce((a, b) => a + (b.originalSize || 0), 0);
    const totalComp = items.reduce((a, b) => a + (b.compressedSize || 0), 0);
    return { totalOrig, totalComp };
  }, [items]);

  return (
    <div className="min-h-screen">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Toast toasts={toasts} removeToast={removeToast} />

      <Hero />

      {/* TOOL */}
      <section id="tool" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-4xl font-extrabold text-center text-zinc-900 dark:text-white">
          Compress Your{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            Images
          </span>
        </h2>

        <div className="mt-10">
          <UploadDropzone onFiles={onFiles} />
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6 items-start">
          {/* Settings */}
          <div className="lg:col-span-1 space-y-6">
            <ControlsPanel
              quality={quality}
              setQuality={setQuality}
              format={format}
              setFormat={setFormat}
              resizeEnabled={resizeEnabled}
              setResizeEnabled={setResizeEnabled}
              lockAspect={lockAspect}
              setLockAspect={setLockAspect}
              width={width}
              setWidth={setWidth}
              height={height}
              setHeight={setHeight}
            />

            <div className="bg-white dark:bg-zinc-950/40 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm p-5">
              <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Totals</p>
              <p className="mt-1 text-sm font-extrabold">
                {stats.totalOrig.toLocaleString()} B → {stats.totalComp.toLocaleString()} B
              </p>
            </div>

            <HistoryPanel history={history} />
          </div>

          {/* Previews + Actions */}
          <div className="lg:col-span-2 space-y-6">
            <BatchActions
              canCompress={items.length > 0}
              onCompress={compressAll}
              busy={busy}
              progressText={progressText}
              onDownloadAll={downloadAllZip}
              onClear={clearAll}
            />

            {items.length === 0 ? (
              <div className="bg-white dark:bg-zinc-950/40 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm p-10 text-center text-zinc-500 dark:text-zinc-400">
                Add images to see previews here.
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((it) => (
                  <ImageCard key={it.id} item={it} onDownload={downloadOne} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Features />
      <FAQ />
      <Footer />
    </div>
  );
}
