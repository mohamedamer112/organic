import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import FloatingWhatsApp from "@/components/public/FloatingWhatsApp";
import Hero from "@/components/public/Hero";
import FeaturesBar from "@/components/public/FeaturesBar";
import ProductGrid from "@/components/public/ProductGrid";
import GalleryGrid from "@/components/public/GalleryGrid";
import TestimonialCard from "@/components/public/TestimonialCard";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products";

const TESTIMONIALS = [
  { name: "سارة أحمد", comment: "أفضل خبز حبة كاملة جربته في القاهرة، طعمه طبيعي جداً وواضح إنه مافيهوش أي إضافات.", avatar: "/images/placeholder.jpg" },
  { name: "محمد العزب", comment: "بنطلب كل أسبوع للبيت، التوصيل سريع والمنتجات دايماً طازجة.", avatar: "/images/placeholder.jpg" },
  { name: "منى فتحي", comment: "الفطير المشلتت رهيب، والخدمة عبر واتساب سهلت علينا الطلب جداً.", avatar: "/images/placeholder.jpg" },
];

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 6);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturesBar />

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <h2 className="font-cairo text-3xl font-bold text-charcoal sm:text-4xl">مخبوزاتنا</h2>
              <div className="mx-auto mt-3 h-1 w-[60px] bg-terracotta" />
            </div>
            <ProductGrid products={featured as any} />
            <div className="mt-10 text-center">
              <Link
                href="/products"
                className="rounded-btn border-2 border-olive px-7 py-3 font-cairo text-base font-semibold text-olive transition hover:bg-olive hover:text-white"
              >
                عرض الكل
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="bg-cream py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 md:items-center">
            <div className="relative aspect-video overflow-hidden rounded-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.15)] md:order-1">
              <Image src="/images/placeholder.jpg" alt="داخل المخبز" fill className="object-cover" />
            </div>
            <div className="md:order-2">
              <h2 className="font-cairo text-3xl font-bold text-olive sm:text-4xl">
                لأن الجودة تبدأ من الحبة الأولى
              </h2>
              <p className="mt-4 font-tajawal text-base leading-relaxed text-charcoal">
                نحرص على اختيار أجود أنواع القمح الكامل، ونطحنه طازجاً كل يوم، لنقدم لكم مخبوزات
                طبيعية 100% بدون أي مواد حافظة أو إضافات صناعية — من المزرعة إلى فرن مخبزنا مباشرة.
              </p>
              <ul className="mt-6 space-y-2 font-tajawal text-base text-charcoal">
                <li>✓ دقيق طازج يومياً</li>
                <li>✓ عجن يدوي تقليدي</li>
                <li>✓ خبز على الطلب</li>
              </ul>
              <Link
                href="/products"
                className="mt-6 inline-block rounded-btn border-2 border-olive px-7 py-3 font-cairo text-base font-semibold text-olive transition hover:bg-olive hover:text-white"
              >
                تعرف علينا أكثر
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <h2 className="font-cairo text-3xl font-bold text-charcoal sm:text-4xl">معرض الصور</h2>
            </div>
            <GalleryGrid />
          </div>
        </section>

        <section className="bg-olive py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-10 text-center font-cairo text-3xl font-bold text-white sm:text-4xl">
              ماذا يقول عملاؤنا
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="py-20 text-center text-white"
          style={{ backgroundImage: "linear-gradient(135deg, #556B2F 0%, #3D4F2A 100%)" }}
        >
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-cairo text-3xl font-bold sm:text-4xl">جرب الطعم الطبيعي اليوم</h2>
            <p className="mt-3 font-tajawal text-lg text-cream">اطلب الآن ونوصلك طازج</p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-pill bg-whatsapp px-10 py-[18px] font-cairo text-lg font-bold text-white transition hover:bg-whatsappDark"
            >
              📲 اطلب عبر واتساب
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
