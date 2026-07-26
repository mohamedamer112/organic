export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString("ar-EG")} ج.م`;
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Extracts the Cloudinary public_id from a secure_url so we can delete it later. */
export function getCloudinaryPublicId(url: string): string | null {
  try {
    if (!url.includes("res.cloudinary.com")) return null;
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    const afterUpload = parts[1];
    const segments = afterUpload.split("/");
    // drop version segment like v1234567 if present
    const withoutVersion = segments[0].startsWith("v") && /^\d+$/.test(segments[0].slice(1))
      ? segments.slice(1)
      : segments;
    const fileWithExt = withoutVersion.join("/");
    return fileWithExt.replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
}
