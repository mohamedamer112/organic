"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-border bg-white px-6">
      <h2 className="font-cairo text-lg font-semibold text-charcoal">
        مرحباً، {session?.user?.name || "مدير المتجر"}
      </h2>
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="flex items-center gap-2 rounded-btn px-4 py-2 font-cairo text-sm font-medium text-terracotta transition hover:bg-cream"
      >
        <LogOut size={18} />
        تسجيل الخروج
      </button>
    </header>
  );
}
