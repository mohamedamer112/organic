"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types";
import CategoryFilter from "@/components/public/CategoryFilter";
import ProductGrid from "@/components/public/ProductGrid";

export default function ProductsClient({ products }: { products: Product[] }) {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    if (category === "all") return products;
    return products.filter((p) => p.category === category);
  }, [products, category]);

  return (
    <>
      <div className="bg-cream py-4">
        <div className="mx-auto max-w-7xl px-6">
          <CategoryFilter active={category} onChange={setCategory} />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <ProductGrid products={filtered} />
      </div>
    </>
  );
}
