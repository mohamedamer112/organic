"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("بيانات الدخول غير صحيحة");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md rounded-card bg-white p-10 shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
        <div className="mb-8 text-center">
          <span className="text-4xl">🌾</span>
          <h1 className="mt-3 font-cairo text-2xl font-bold text-charcoal">لوحة تحكم ORGANIC FOOD</h1>
          <p className="mt-1 font-tajawal text-sm text-softbrown">سجّل الدخول لإدارة المنتجات والطلبات</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-tajawal text-sm text-charcoal">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-input border border-wheat bg-cream px-4 py-3 font-tajawal text-base focus:border-olive focus:shadow-[0_0_0_3px_rgba(85,107,47,0.15)] focus:outline-none"
              placeholder="admin@organicfood.com"
            />
          </div>
          <div>
            <label className="mb-2 block font-tajawal text-sm text-charcoal">كلمة المرور</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-input border border-wheat bg-cream px-4 py-3 font-tajawal text-base focus:border-olive focus:shadow-[0_0_0_3px_rgba(85,107,47,0.15)] focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="font-tajawal text-sm text-[#E53935]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-btn bg-olive px-4 py-3 font-cairo font-semibold text-white transition hover:bg-oliveDark disabled:opacity-60"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
