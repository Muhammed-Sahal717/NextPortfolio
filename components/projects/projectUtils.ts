// --- ROBUST HELPER: PARSE SUPABASE IMAGE DATA ---
export const getCleanImages = (
  imageColumn: unknown,
  galleryColumn: unknown,
): string[] => {
  const images: string[] = [];

  const processEntry = (entry: unknown) => {
    if (!entry) return;

    if (Array.isArray(entry)) {
      entry.forEach((item) => processEntry(item));
      return;
    }

    if (typeof entry === "string") {
      const trimmed = entry.trim();

      if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        const inner = trimmed.slice(1, -1);
        const urls = inner.split(",");
        urls.forEach((url) => {
          const cleanUrl = url.replace(/["']/g, "").trim();
          if (cleanUrl.startsWith("http")) images.push(cleanUrl);
        });
      } else {
        const cleanUrl = trimmed.replace(/["']/g, "").trim();
        if (cleanUrl.startsWith("http")) images.push(cleanUrl);
      }
    }
  };

  processEntry(imageColumn);
  processEntry(galleryColumn);

  return Array.from(new Set(images));
};
