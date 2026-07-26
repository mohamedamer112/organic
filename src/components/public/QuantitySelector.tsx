"use client";

import { SpecialOption } from "@/types";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  options: SpecialOption[];
  selected: number;
  onChange: (qty: number) => void;
}

export default function QuantitySelector({ options, selected, onChange }: QuantitySelectorProps) {
  return (
    <div className="flex overflow-hidden rounded-btn border border-wheat">
      {options.map((opt) => (
        <button
          key={opt.qty}
          type="button"
          onClick={() => onChange(opt.qty)}
          className={cn(
            "flex-1 px-3 py-2 font-cairo text-sm font-semibold transition",
            selected === opt.qty ? "bg-olive text-white" : "bg-white text-charcoal hover:bg-cream"
          )}
        >
          {opt.qty} قطعة — {opt.price} ج.م
        </button>
      ))}
    </div>
  );
}
