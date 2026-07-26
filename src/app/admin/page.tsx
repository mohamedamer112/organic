import Link from "next/link";
import { Package, ClipboardList, CalendarClock, Plus, Eye } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { getDashboardStats } from "@/lib/orders";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="mb-6 font-cairo text-2xl font-bold text-charcoal">لوحة التحكم</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard icon={Package} label="إجمالي المنتجات" value={stats.productsCount} color="#556B2F" />
        <StatsCard icon={ClipboardList} label="إجمالي الطلبات" value={stats.ordersCount} color="#CD5C5C" />
        <StatsCard icon={CalendarClock} label="الطلبات اليوم" value={stats.todayOrdersCount} color="#25D366" />
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-btn bg-terracotta px-6 py-3 font-cairo font-semibold text-white hover:bg-terracottaDark"
        >
          <Plus size={18} /> إضافة منتج
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center gap-2 rounded-btn border border-olive px-6 py-3 font-cairo font-semibold text-olive hover:bg-olive hover:text-white"
        >
          <Eye size={18} /> عرض الطلبات
        </Link>
      </div>
    </div>
  );
}
