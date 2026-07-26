"use client";

import { useMemo, useState } from "react";
import { OrderLogItem, CartItem } from "@/types";
import { formatDate, formatPrice } from "@/lib/utils";

export default function OrderTable({ orders }: { orders: OrderLogItem[] }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const created = new Date(o.createdAt).getTime();
      if (from && created < new Date(from).getTime()) return false;
      if (to && created > new Date(to).getTime() + 86400000) return false;
      return true;
    });
  }, [orders, from, to]);

  function exportCsv() {
    const rows = [
      ["التاريخ", "المنتجات", "الإجمالي", "الملاحظات"],
      ...filtered.map((o) => [
        formatDate(o.createdAt),
        (o.items as unknown as CartItem[]).map((i) => `${i.name} x${i.quantity || i.weight}`).join(" | "),
        String(o.total),
        o.notes || "",
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <div>
          <label className="mb-1 block font-tajawal text-xs text-softbrown">من تاريخ</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-input border border-wheat px-3 py-2 font-tajawal text-sm" />
        </div>
        <div>
          <label className="mb-1 block font-tajawal text-xs text-softbrown">إلى تاريخ</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="rounded-input border border-wheat px-3 py-2 font-tajawal text-sm" />
        </div>
        <button onClick={exportCsv} className="rounded-btn border border-olive px-4 py-2 font-cairo text-sm font-medium text-olive hover:bg-olive hover:text-white">
          تصدير CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-card border border-border">
        <table className="w-full text-right">
          <thead className="bg-cream">
            <tr className="font-cairo text-sm text-charcoal">
              <th className="px-4 py-3">التاريخ</th>
              <th className="px-4 py-3">المنتجات</th>
              <th className="px-4 py-3">الإجمالي</th>
              <th className="px-4 py-3">الملاحظات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center font-tajawal text-softbrown">
                  لا توجد طلبات
                </td>
              </tr>
            ) : (
              filtered.map((o) => (
                <tr key={o.id} className="border-t border-border font-tajawal text-sm align-top">
                  <td className="whitespace-nowrap px-4 py-3">{formatDate(o.createdAt)}</td>
                  <td className="px-4 py-3">
                    <ul className="space-y-1">
                      {(o.items as unknown as CartItem[]).map((item, i) => (
                        <li key={i}>
                          {item.name} × {item.weight ? `${item.weight} كيلو` : item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-cairo font-semibold text-olive">
                    {formatPrice(o.total)}
                  </td>
                  <td className="px-4 py-3">{o.notes || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
