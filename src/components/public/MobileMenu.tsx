"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] transition-opacity md:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <div className="absolute inset-0 bg-charcoal/50" onClick={onClose} />
      <div
        className={cn(
          "absolute inset-y-0 right-0 w-72 bg-white p-6 shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="font-cairo text-lg font-bold text-charcoal">ORGANIC FOOD</span>
          <button aria-label="إغلاق القائمة" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col gap-6 font-cairo text-lg font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onClose} className="text-charcoal hover:text-olive">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
