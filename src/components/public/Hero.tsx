import Link from "next/link";

const MARQUEE_EMOJIS = ["🍞", "🥖", "🥐", "🫓", "🍪", "🥯"];

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[600px] items-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(85,107,47,0.85) 0%, rgba(54,69,47,0.75) 100%), url('/images/placeholder.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 text-right">
        <div className="max-w-xl fade-up-onview">
          <h1 className="font-cairo text-4xl font-bold leading-tight text-white sm:text-6xl">
            مخبوزات أورجانيك من الحبة الكاملة
          </h1>
          <p className="mt-4 font-tajawal text-lg text-cream sm:text-xl">
            من المطحن إلى العجان... بدون إضافات صناعية
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block rounded-pill bg-terracotta px-10 py-4 font-cairo text-base font-semibold text-white shadow-[0_4px_12px_rgba(205,92,92,0.25)] transition hover:-translate-y-0.5 hover:bg-terracottaDark"
          >
            اطلب الآن
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[120px] overflow-hidden bg-black/10">
        <div className="flex h-full w-max animate-marquee items-center gap-16 text-5xl">
          {[...MARQUEE_EMOJIS, ...MARQUEE_EMOJIS, ...MARQUEE_EMOJIS].map((emoji, i) => (
            <span key={i}>{emoji}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
