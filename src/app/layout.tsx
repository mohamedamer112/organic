import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ORGANIC FOOD — مخبوزات أورجانيك من الحبة الكاملة",
  description: "مخبوزات أورجانيك من الحبة الكاملة، بدون إضافات صناعية، طازجة يومياً. اطلب الآن عبر واتساب في مصر والوطن العربي.",
  openGraph: {
    title: "ORGANIC FOOD — مخبوزات أورجانيك من الحبة الكاملة",
    description: "من المطحن إلى العجان... بدون إضافات صناعية",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`}>
      <body className="font-tajawal antialiased bg-white text-charcoal">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
