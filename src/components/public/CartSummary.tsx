"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { logOrder } from "@/lib/orders";

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "201002882634";

export default function CartSummary() {
  const { items, totalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const grandTotal = totalPrice();

  function buildMessage() {
    const lines = items.map((item, idx) => {
      const qtyLabel = item.weight ? `(${item.weight} كيلو)` : `× ${item.quantity}`;
      return `${idx + 1}. ${item.name} ${qtyLabel} = ${item.lineTotal} ج.م`;
    });

    return [
      "🥖 طلب جديد من ORGANIC FOOD",
      "",
      `الاسم: ${name}`,
      `رقم الهاتف: ${phone}`,
      `العنوان: ${address}`,
      "",
      "المنتجات:",
      ...lines,
      "",
      `الإجمالي: ${grandTotal} ج.م`,
      "",
      `ملاحظات: ${notes || "لا يوجد"}`,
    ].join("\n");
  }

  async function handleCheckout() {
    if (items.length === 0) return;

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("من فضلك املأ الاسم ورقم الهاتف والعنوان");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await logOrder(items, grandTotal, name, phone, address, notes);
      const message = buildMessage();
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, "_blank");
      clearCart();
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-card bg-cream p-8">
      <h3 className="font-cairo text-2xl font-bold text-charcoal">ملخص الطلب</h3>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-cairo text-lg font-semibold">الإجمالي</span>
        <span className="font-cairo text-3xl font-bold text-terracotta">{formatPrice(grandTotal)}</span>
      </div>

      <div className="my-4 border-t border-dashed border-wheat" />

      <div className="space-y-4">
        <div>
          <label className="mb-2 block font-tajawal text-sm text-charcoal">
            الاسم <span className="text-terracotta">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-input border border-wheat bg-white px-4 py-3 font-tajawal text-base placeholder:text-[#A09080] focus:border-olive focus:shadow-[0_0_0_3px_rgba(85,107,47,0.15)] focus:outline-none"
            placeholder="اسمك الكامل"
          />
        </div>

        <div>
          <label className="mb-2 block font-tajawal text-sm text-charcoal">
            رقم الهاتف <span className="text-terracotta">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-input border border-wheat bg-white px-4 py-3 font-tajawal text-base placeholder:text-[#A09080] focus:border-olive focus:shadow-[0_0_0_3px_rgba(85,107,47,0.15)] focus:outline-none"
            placeholder="01xxxxxxxxx"
            dir="ltr"
          />
        </div>

        <div>
          <label className="mb-2 block font-tajawal text-sm text-charcoal">
            العنوان <span className="text-terracotta">*</span>
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
            className="w-full rounded-input border border-wheat bg-white px-4 py-3 font-tajawal text-base placeholder:text-[#A09080] focus:border-olive focus:shadow-[0_0_0_3px_rgba(85,107,47,0.15)] focus:outline-none"
            placeholder="المحافظة، المدينة، الشارع، رقم العقار"
          />
        </div>

        <div>
          <label className="mb-2 block font-tajawal text-sm text-charcoal">
            ملاحظات على الطلب (اختياري)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full rounded-input border border-wheat bg-white px-4 py-3 font-tajawal text-base placeholder:text-[#A09080] focus:border-olive focus:shadow-[0_0_0_3px_rgba(85,107,47,0.15)] focus:outline-none"
            placeholder="مثال: من غير سكر إضافي"
          />
        </div>
      </div>

      {error && <p className="mt-3 font-tajawal text-sm text-[#E53935]">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={items.length === 0 || loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-pill bg-whatsapp px-10 py-[18px] font-cairo text-lg font-bold text-white transition hover:bg-whatsappDark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <>📲 إرسال الطلب عبر واتساب</>
        )}
      </button>
    </div>
  );
}
