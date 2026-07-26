"use client";

import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import FloatingWhatsApp from "@/components/public/FloatingWhatsApp";
import CartItem from "@/components/public/CartItem";
import CartSummary from "@/components/public/CartSummary";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

export default function CartPage() {
  const items = useCart((s) => s.items);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="mb-8 font-cairo text-3xl font-bold text-charcoal">سلة المشتريات</h1>

        {items.length === 0 ? (
          <div className="rounded-card border border-border bg-cream/50 py-24 text-center">
            <p className="font-cairo text-xl text-charcoal">السلة فارغة حالياً</p>
            <p className="mt-2 font-tajawal text-softbrown">أضف بعض المخبوزات الطازجة لتبدأ طلبك</p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-btn bg-terracotta px-8 py-3 font-cairo font-semibold text-white transition hover:bg-terracottaDark"
            >
              تصفح المنتجات
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[60%_40%]">
            <div className="group rounded-card border border-border bg-white p-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <CartSummary />
            </div>
          </div>
        )}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
