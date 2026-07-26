"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { logOrder } from "@/lib/orders";

const DELIVERY_FEE = 25;
const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "201XXXXXXXXX";

export default function CartSummary() {
  const { items, totalPrice, clearCart } = useCart();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const productsTotal = totalPrice();
  const grandTotal = items.length > 0 ? productsTotal + DELIVERY_FEE : 0;

  function buildMessage() {
    const lines = items.map((item, idx) => {
      const qtyLabel = item.weight ? `(${item.weight} كيلو)` : `× ${item.quantity}`;
      return `${idx + 1}. ${item.name} ${qtyLabel} = ${item.lineTotal} ج.م`;
    });

    return [
      "🥖 طلب جديد من ORGANIC FOOD",
      "",
      "المنتجات:",
      ...lines,
      "",
      `إجمالي المنتجات: ${productsTotal} ج.م`,
      `رسوم التوصيل: ${DELIVERY_FEE} ج.م`,
      `الإجمالي الكلي: ${grandTotal} ج.م`,
      "",
      `ملاحظات: ${notes || "لا يوجد"}`,
      "",
      "العنوان: [سيتم إرساله في المحادثة]",
    ].join("\n");
  }

  async function handleCheckout() {
    if (items.length === 0) return;
    setLoading(true);
    try {
      await logOrder(items, grandTotal, notes);
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

      <div className="mt-6 space-y-3 font-tajawal text-base">
        <div className="flex justify-between">
          <span>إجمالي المنتجات</span>
          <span>{formatPrice(productsTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>رسوم التوصيل</span>
          <span>{formatPrice(DELIVERY_FEE)}</span>
        </div>
      </div>

      <div className="my-4 border-t border-dashed border-wheat" />

      <div className="flex items-center justify-between">
        <span className="font-cairo text-lg font-semibold">الإجمالي</span>
        <span className="font-cairo text-3xl font-bold text-terracotta">{formatPrice(grandTotal)}</span>
      </div>

      <div className="mt-6">
        <label className="mb-2 block font-tajawal text-sm text-charcoal">
          ملاحظات على الطلب (اختياري)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full rounded-input border border-wheat bg-white px-4 py-3 font-tajawal text-base placeholder:text-[#A09080] focus:border-olive focus:shadow-[0_0_0_3px_rgba(85,107,47,0.15)] focus:outline-none"
          placeholder="مثال: من غير سكر إضافي"
        />
      </div>

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
