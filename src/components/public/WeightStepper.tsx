"use client";

import { Minus, Plus } from "lucide-react";
import { formatWeightLabel } from "@/lib/utils";

interface WeightStepperProps {
  weight: number;
  onChange: (weight: number) => void;
}

const STEP = 0.25;
const MIN = 0.25;
const MAX = 5;

export default function WeightStepper({ weight, onChange }: WeightStepperProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="إنقاص الوزن"
        onClick={() => onChange(Math.max(MIN, +(weight - STEP).toFixed(2)))}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-charcoal transition hover:bg-wheat"
      >
        <Minus size={16} />
      </button>
      <span className="min-w-[90px] text-center font-cairo font-semibold text-charcoal">
        {formatWeightLabel(weight)}
      </span>
      <button
        type="button"
        aria-label="زيادة الوزن"
        onClick={() => onChange(Math.min(MAX, +(weight + STEP).toFixed(2)))}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta text-white transition hover:bg-terracottaDark"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
