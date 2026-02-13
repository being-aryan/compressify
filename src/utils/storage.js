const KEY = "compressify_theme";

export function getSavedTheme() {
  try {
    const v = localStorage.getItem(KEY);
    return v === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function setSavedTheme(theme) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // ignore
  }
}
