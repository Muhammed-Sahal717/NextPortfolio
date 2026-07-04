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

      // Handle stringified JSON arrays like '["url1", "url2"]'
      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            parsed.forEach((item) => processEntry(item));
            return;
          }
        } catch (e) {
          // Fallback if parsing fails
        }
      }

      // Handle Postgres array syntax like '{url1, url2}'
      if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        const inner = trimmed.slice(1, -1);
        const urls = inner.split(",");
        urls.forEach((url) => {
          const cleanUrl = url.replace(/["']/g, "").trim();
          if (cleanUrl.startsWith("http")) images.push(cleanUrl);
        });
      } else {
        // Plain string
        const cleanUrl = trimmed.replace(/["']/g, "").trim();
        if (cleanUrl.startsWith("http")) images.push(cleanUrl);
      }
    }
  };

  processEntry(imageColumn);
  processEntry(galleryColumn);

  return Array.from(new Set(images));
};
