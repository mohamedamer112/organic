"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Search } from "lucide-react";
import { Product, CATEGORIES } from "@/types";
import { formatPrice } from "@/lib/utils";
import { deleteProduct } from "@/lib/products";
import DeleteConfirm from "./DeleteConfirm";

const PAGE_SIZE = 10;

export default function ProductTable({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    await deleteProduct(toDelete.id);
    setDeleting(false);
    setToDelete(null);
    router.refresh();
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-softbrown" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="بحث بالاسم"
            className="w-full rounded-input border border-wheat bg-white py-2 pr-10 pl-4 font-tajawal text-sm focus:border-olive focus:outline-none"
          />
        </div>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="rounded-input border border-wheat bg-white px-4 py-2 font-tajawal text-sm focus:border-olive focus:outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-card border border-border">
        <table className="w-full text-right">
          <thead className="bg-cream">
            <tr className="font-cairo text-sm text-charcoal">
              <th className="px-4 py-3">صورة</th>
              <th className="px-4 py-3">الاسم</th>
              <th className="px-4 py-3">الفئة</th>
              <th className="px-4 py-3">السعر</th>
              <th className="px-4 py-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center font-tajawal text-softbrown">
                  لا توجد منتجات مطابقة
                </td>
              </tr>
            ) : (
              paginated.map((p) => (
                <tr key={p.id} className="border-t border-border font-tajawal text-sm">
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                      <Image src={p.image || "/images/placeholder.jpg"} alt={p.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-cairo font-medium text-charcoal">{p.name}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-olive hover:bg-wheat"
                        aria-label="تعديل"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => setToDelete(p)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-[#E53935] hover:bg-wheat"
                        aria-label="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-9 w-9 rounded-full font-cairo text-sm ${
                page === n ? "bg-olive text-white" : "bg-cream text-charcoal"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      )}

      <DeleteConfirm
        open={!!toDelete}
        productName={toDelete?.name || ""}
        loading={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
