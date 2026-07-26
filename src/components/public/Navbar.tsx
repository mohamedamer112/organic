"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/#about", label: "من نحن" },
  { href: "/cart", label: "السلة" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bounce, setBounce] = useState(false);
  const totalItems = useCart((s) => s.totalItems());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (totalItems === 0) return;
    setBounce(true);
    const t = setTimeout(() => setBounce(false), 400);
    return () => clearTimeout(t);
  }, [totalItems]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 h-[72px] border-b border-border transition-all",
          scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"
        )}
      >
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-olive text-2xl">
              🌾
            </span>
            <span className="hidden font-cairo text-lg font-bold text-charcoal sm:inline">
              ORGANIC FOOD
            </span>
          </Link>

          <ul className="hidden items-center gap-8 font-cairo text-base font-medium md:flex">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-charcoal transition hover:text-olive">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              aria-label="السلة"
              className={cn("relative rounded-full p-2 text-charcoal hover:text-terracotta", bounce && "animate-bounce_cart")}
            >
              <ShoppingCart size={26} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              aria-label="القائمة"
              className="rounded-btn p-2 text-charcoal md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={26} />
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </>
  );
}
