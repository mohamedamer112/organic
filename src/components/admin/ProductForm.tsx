"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product, CATEGORIES } from "@/types";
import { createProduct, updateProduct } from "@/lib/products";
import ImageUploader from "./ImageUploader";

const UNITS = ["كيس", "كيلو", "قطعة"];

interface ProductFormProps {
  product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!product;

  const [name, setName] = useState(product?.name || "");
  const [category, setCategory] = useState(product?.category || CATEGORIES[1].value);
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [unit, setUnit] = useState(product?.unit || UNITS[0]);
  const [isSpecial, setIsSpecial] = useState(product?.isSpecial || false);
  const [option1Price, setOption1Price] = useState(
    product?.specialOptions?.find((o) => o.qty === 1)?.price?.toString() || ""
  );
  const [option2Price, setOption2Price] = useState(
    product?.specialOptions?.find((o) => o.qty === 2)?.price?.toString() || ""
  );
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name || !category || !description || !price || !unit) {
      setError("جميع الحقول مطلوبة");
      return;
    }
    if (Number(price) <= 0) {
      setError("السعر يجب أن يكون أكبر من صفر");
      return;
    }
    if (!isEdit && !imageBase64) {
      setError("يجب اختيار صورة للمنتج");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.set("name", name);
    formData.set("category", category);
    formData.set("description", description);
    formData.set("price", price);
    formData.set("unit", unit);
    formData.set("isSpecial", String(isSpecial));
    if (imageBase64) formData.set("image", imageBase64);

    if (isSpecial) {
      const options = [
        { qty: 1, price: Number(option1Price) },
        { qty: 2, price: Number(option2Price) },
      ];
      formData.set("specialOptions", JSON.stringify(options));
    }

    const result = isEdit
      ? await updateProduct(product!.id, formData)
      : await createProduct(formData);

    setLoading(false);

    if (!result.success) {
      setError(result.error || "حدث خطأ ما");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <ImageUploader currentImage={product?.image} onImageSelected={setImageBase64} />

      <div>
        <label className="mb-2 block font-tajawal text-sm text-charcoal">الاسم</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-input border border-wheat bg-cream px-4 py-3 font-tajawal focus:border-olive focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block font-tajawal text-sm text-charcoal">الفئة</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-input border border-wheat bg-cream px-4 py-3 font-tajawal focus:border-olive focus:outline-none"
        >
          {CATEGORIES.filter((c) => c.value !== "all").map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-tajawal text-sm text-charcoal">الوصف</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-input border border-wheat bg-cream px-4 py-3 font-tajawal focus:border-olive focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block font-tajawal text-sm text-charcoal">السعر (ج.م)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-input border border-wheat bg-cream px-4 py-3 font-tajawal focus:border-olive focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block font-tajawal text-sm text-charcoal">الوحدة</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full rounded-input border border-wheat bg-cream px-4 py-3 font-tajawal focus:border-olive focus:outline-none"
          >
            {UNITS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 font-tajawal text-sm text-charcoal">
        <input type="checkbox" checked={isSpecial} onChange={(e) => setIsSpecial(e.target.checked)} />
        منتج بخيارات خاصة (مثل فطير مشلتت: 1 أو 2 قطعة)
      </label>

      {isSpecial && (
        <div className="grid grid-cols-2 gap-4 rounded-card bg-cream p-4">
          <div>
            <label className="mb-2 block font-tajawal text-sm text-charcoal">سعر القطعة الواحدة</label>
            <input
              type="number"
              value={option1Price}
              onChange={(e) => setOption1Price(e.target.value)}
              className="w-full rounded-input border border-wheat bg-white px-4 py-2 font-tajawal"
            />
          </div>
          <div>
            <label className="mb-2 block font-tajawal text-sm text-charcoal">سعر القطعتين</label>
            <input
              type="number"
              value={option2Price}
              onChange={(e) => setOption2Price(e.target.value)}
              className="w-full rounded-input border border-wheat bg-white px-4 py-2 font-tajawal"
            />
          </div>
        </div>
      )}

      {error && <p className="font-tajawal text-sm text-[#E53935]">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-btn bg-olive px-8 py-3 font-cairo font-semibold text-white transition hover:bg-oliveDark disabled:opacity-60"
        >
          {loading ? "جاري الحفظ..." : isEdit ? "حفظ التعديلات" : "إضافة المنتج"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-btn border border-wheat px-8 py-3 font-cairo font-semibold text-charcoal hover:bg-cream"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
