import Link from "next/link";
import Image from "next/image";

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
      {/* النص الثابت المضيء بلون فسفوري */}
      <div className="absolute top-10 left-0 right-0 flex flex-col items-center gap-4 px-4">
        <h2
          className="text-center font-cairo text-2xl font-extrabold sm:text-4xl"
          style={{
            color: "#39FF14",
            textShadow:
              "0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 40px rgba(57,255,20,0.8), 0 0 70px rgba(57,255,20,0.6)",
            animation: "glow-pulse 2.2s ease-in-out infinite",
          }}
        >
          {GLOW_TEXT}
        </h2>
        <div className="overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
          <Image
            src="/images/720019158_122108624829303412_6892076907321696677_n.jpg"
            alt="ORGANIC FOOD - مخبوزات يمنية مصرية"
            width={140}
            height={140}
            className="h-[100px] w-[100px] object-cover sm:h-[140px] sm:w-[140px]"
            priority
          />
        </div>
      </div>

      <style>{`
        @keyframes glow-pulse {
          0%, 100% {
            text-shadow: 0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 40px rgba(57,255,20,0.8), 0 0 70px rgba(57,255,20,0.6);
          }
          50% {
            text-shadow: 0 0 20px #39FF14, 0 0 35px #39FF14, 0 0 60px rgba(57,255,20,1), 0 0 100px rgba(57,255,20,0.8);
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
