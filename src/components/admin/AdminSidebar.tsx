"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/orders", label: "الطلبات", icon: ClipboardList },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-l border-border bg-white md:block">
      <div className="flex h-[72px] items-center gap-2 border-b border-border px-6">
        <span className="text-2xl">🌾</span>
        <span className="font-cairo font-bold text-charcoal">لوحة التحكم</span>
      </div>
      <nav className="p-4">
        {LINKS.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "mb-1 flex items-center gap-3 rounded-btn px-4 py-3 font-cairo text-sm font-medium transition",
                active ? "bg-olive text-white" : "text-charcoal hover:bg-cream"
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
