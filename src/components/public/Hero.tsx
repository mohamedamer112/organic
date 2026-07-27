import Link from "next/link";

const MARQUEE_EMOJIS = ["🍞", "🥖", "🥐", "🫓", "🍪", "🥯"];
const GLOW_TEXT = "مخبوزات أورجانيك بالحبة الكاملة";

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
      {/* شريط النص المتحرك المضيء */}
      <div className="absolute top-10 left-0 right-0 overflow-hidden py-3">
        <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="font-cairo text-2xl font-extrabold text-white sm:text-4xl"
              style={{
                textShadow:
                  "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(205,92,92,0.7), 0 0 70px rgba(205,92,92,0.5)",
                animation: "glow-pulse 2.2s ease-in-out infinite",
                animationDelay: `${i * 0.3}s`,
              }}
            >
              ✨ {GLOW_TEXT} ✨
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes glow-pulse {
          0%, 100% {
            text-shadow: 0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(205,92,92,0.7), 0 0 70px rgba(205,92,92,0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(255,255,255,1), 0 0 35px rgba(255,255,255,0.9), 0 0 60px rgba(205,92,92,0.9), 0 0 100px rgba(205,92,92,0.7);
          }
        }
      `}</style>

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
