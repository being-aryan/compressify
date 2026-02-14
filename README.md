# Compressify 🗜️✨
**Fast, private, and entirely in your browser.**  
No uploads, no servers — just smaller images in seconds.

🔗 **Live Demo:** https://compresssify.netlify.app/  <!-- (as set on the repo) -->

---

## 🚀 What is Compressify?
Compressify is a modern web app that lets you **compress images locally (on-device)**.  
You can upload multiple images, tune compression settings (quality, format, resize), preview results, and download individually or as a ZIP — all without sending files to any backend.

---

## ✅ Features
- **100% client-side compression** (your images never leave your device)
- **Drag & drop upload** + file picker
- **Batch compression** for multiple images
- **Download as ZIP** for all compressed images
- **Format conversion**: output **JPEG / PNG / WEBP**
- **Resize options** with width/height inputs + aspect lock
- **Compression quality slider**
- **History panel** (recent compressions)
- **Light/Dark theme toggle**

Supported input formats: **JPG / PNG / WEBP**  
Supported output formats: **JPEG / PNG / WEBP**

---

## 🧠 How it works (in simple terms)
1. Your image is decoded inside the browser.
2. It’s drawn to an offscreen **HTML Canvas**.
3. The canvas is re-encoded using your chosen **format + quality**.
4. The compressed file is generated instantly and ready to download — **no uploads**.

---

## 🛠️ Tech Stack
- **React + Vite** (frontend)
- **Tailwind CSS** (UI styling)
- **JSZip** (bulk download as ZIP)
- **Canvas API** (image re-encoding)

---

## 📦 Getting Started (Local Setup)

### 1) Clone the repository
```bash
git clone https://github.com/being-aryan/compressify.git
cd compressify
