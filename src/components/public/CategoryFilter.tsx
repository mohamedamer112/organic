"use client";

import { CATEGORIES } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  active: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            "rounded-pill px-5 py-2 font-cairo text-sm font-medium transition",
            active === cat.value
              ? "bg-olive text-white"
              : "border border-wheat bg-transparent text-charcoal hover:bg-white"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
