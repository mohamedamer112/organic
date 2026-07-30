"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/hooks/useCart";
import { formatPrice, formatWeightLabel } from "@/lib/utils";

export default function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity, updateWeight } = useCart();
  const isKg = !!item.weight;

  return (
    <div className="flex items-center gap-4 border-b border-border py-4 last:border-0">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
        <Image src={item.image || "/images/placeholder.jpg"} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <h4 className="font-cairo text-lg font-semibold text-charcoal">{item.name}</h4>
        <p className="font-tajawal text-sm text-wheat">{formatPrice(item.unitPrice)} / {item.unit}</p>
      </div>

      {isKg ? (
        <div className="flex items-center gap-2">
          <button
            aria-label="إنقاص الوزن"
            onClick={() => updateWeight(item.id, +(item.weight! - 0.25).toFixed(2))}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-cream"
          >
            <Minus size={14} />
          </button>
          <span className="min-w-[80px] text-center font-cairo font-semibold">{formatWeightLabel(item.weight!)}</span>
          <button
            aria-label="زيادة الوزن"
            onClick={() => updateWeight(item.id, +(item.weight! + 0.25).toFixed(2))}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta text-white"
          >
            <Plus size={14} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            aria-label="إنقاص الكمية"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-cream"
          >
            <Minus size={14} />
          </button>
          <span className="min-w-[24px] text-center font-cairo font-semibold">{item.quantity}</span>
          <button
            aria-label="زيادة الكمية"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta text-white"
          >
            <Plus size={14} />
          </button>
        </div>
      )}

      <div className="w-24 text-left font-cairo text-lg font-bold text-olive">
        {formatPrice(item.lineTotal)}
      </div>

      <button
        aria-label="إزالة من السلة"
        onClick={() => removeItem(item.id)}
        className="text-softbrown opacity-0 transition hover:text-terracotta group-hover:opacity-100 md:opacity-100"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
