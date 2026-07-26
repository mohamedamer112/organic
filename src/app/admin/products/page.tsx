import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllProductsAdmin } from "@/lib/products";
import ProductTable from "@/components/admin/ProductTable";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProductsAdmin();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-cairo text-2xl font-bold text-charcoal">إدارة المنتجات</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-btn bg-terracotta px-5 py-2.5 font-cairo text-sm font-semibold text-white hover:bg-terracottaDark"
        >
          <Plus size={18} /> إضافة منتج جديد
        </Link>
      </div>

      <ProductTable products={products as any} />
    </div>
  );
}
