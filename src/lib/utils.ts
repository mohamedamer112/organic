export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString("ar-EG")} ج.م`;
}

export function formatWeightLabel(weight: number): string {
  const whole = Math.floor(weight);
  const frac = +(weight - whole).toFixed(2);

  const fracLabel =
    frac === 0.25 ? "ربع" : frac === 0.5 ? "نص" : frac === 0.75 ? "تلت أرباع" : "";

  if (whole === 0) {
    return fracLabel ? `${fracLabel} كيلو` : `${weight} كيلو`;
  }
  if (frac === 0) {
    return `${whole} كيلو`;
  }
  return fracLabel ? `${whole} كيلو و${fracLabel}` : `${weight} كيلو`;
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

export function getCloudinaryPublicId(url: string): string | null {
  try {
    if (!url.includes("res.cloudinary.com")) return null;
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    const afterUpload = parts[1];
    const segments = afterUpload.split("/");
    const withoutVersion = segments[0].startsWith("v") && /^\d+$/.test(segments[0].slice(1))
      ? segments.slice(1)
      : segments;
    const fileWithExt = withoutVersion.join("/");
    return fileWithExt.replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
}
