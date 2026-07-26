import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-olive py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-cairo text-lg font-bold">ORGANIC FOOD</span>
        </div>
        <p className="font-tajawal text-sm text-cream">
          مخبوزات أورجانيك من الحبة الكاملة — من المطحن إلى العجان
        </p>
        <ul className="flex gap-6 font-cairo text-sm">
          <li>
            <Link href="/" className="hover:underline">الرئيسية</Link>
          </li>
          <li>
            <Link href="/products" className="hover:underline">المنتجات</Link>
          </li>
          <li>
            <Link href="/cart" className="hover:underline">السلة</Link>
          </li>
        </ul>
        <p className="font-tajawal text-xs text-cream/70">
          © {new Date().getFullYear()} ORGANIC FOOD. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
