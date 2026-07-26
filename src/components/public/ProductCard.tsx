"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import QuantitySelector from "./QuantitySelector";
import WeightStepper from "./WeightStepper";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const [specialQty, setSpecialQty] = useState(product.specialOptions?.[0]?.qty ?? 1);
  const [weight, setWeight] = useState(1);
  const [bagQty, setBagQty] = useState(0);

  const isOutOfStock = !product.isActive;
  const isKg = product.unit === "كيلو";
  const isBag = !product.isSpecial && !isKg;

  const displayPrice = product.isSpecial
    ? product.specialOptions?.find((o) => o.qty === specialQty)?.price ?? product.price
    : isKg
      ? product.price * weight
      : product.price;

  return (
    <div className="group flex flex-col overflow-hidden rounded-card border border-border bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      <div className="relative aspect-square w-full">
        <Image
          src={product.image || "/images/placeholder.jpg"}
          alt={product.name}
          fill
          className="rounded-t-card object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute top-3 right-3 rounded-badge bg-olive px-2 py-1 font-cairo text-xs text-white">
          عضوي
        </span>
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center rounded-t-card bg-white/70">
            <span className="rounded-badge bg-[#9E9E9E] px-3 py-1 font-cairo text-sm text-white line-through">
              نفذت الكمية
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-cairo text-xl font-semibold text-charcoal">{product.name}</h3>
        <p className="font-tajawal text-sm text-softbrown">{product.description}</p>

        <div className="mt-1 font-cairo text-xl font-bold text-olive">
          {formatPrice(displayPrice)} {isBag && <span className="text-sm font-normal text-softbrown">/ {product.unit}</span>}
        </div>

        {product.isSpecial && product.specialOptions && (
          <QuantitySelector
            options={product.specialOptions}
            selected={specialQty}
            onChange={setSpecialQty}
          />
        )}

        {isKg && <WeightStepper weight={weight} onChange={setWeight} />}

        <div className="mt-auto pt-3">
          {isOutOfStock ? (
            <button
              disabled
              className="w-full cursor-not-allowed rounded-btn bg-[#E0E0E0] px-4 py-2 font-cairo text-sm font-semibold text-[#9E9E9E] line-through"
            >
              نفذت الكمية
            </button>
          ) : isBag && bagQty > 0 ? (
            <div className="flex items-center justify-between rounded-btn border border-wheat px-3 py-1">
              <button
                aria-label="إنقاص"
                onClick={() => setBagQty((q) => Math.max(0, q - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-cream"
              >
                <Minus size={16} />
              </button>
              <span className="font-cairo font-semibold">{bagQty}</span>
              <button
                aria-label="زيادة"
                onClick={() => {
                  setBagQty((q) => q + 1);
                  addItem(product, 1);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta text-white"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                if (isBag) {
                  setBagQty(1);
                  addItem(product, 1);
                } else if (isKg) {
                  addItem(product, 1, weight);
                } else {
                  addItem(product, specialQty);
                }
              }}
              className="flex w-full items-center justify-center gap-2 rounded-btn bg-terracotta px-4 py-2 font-cairo text-sm font-semibold text-white shadow-[0_4px_12px_rgba(205,92,92,0.25)] transition hover:-translate-y-0.5 hover:bg-terracottaDark"
            >
              <Plus size={18} /> أضف للسلة
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
