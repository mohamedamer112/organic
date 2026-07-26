import Image from "next/image";

const GALLERY_IMAGES = [
  "/images/placeholder.jpg",
  "/images/placeholder.jpg",
  "/images/placeholder.jpg",
  "/images/placeholder.jpg",
  "/images/placeholder.jpg",
  "/images/placeholder.jpg",
];

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {GALLERY_IMAGES.map((src, i) => (
        <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={src}
            alt={`صورة من المخبز ${i + 1}`}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-olive/0 text-2xl opacity-0 transition group-hover:bg-olive/40 group-hover:opacity-100">
            🔍
          </div>
        </div>
      ))}
    </div>
  );
}
