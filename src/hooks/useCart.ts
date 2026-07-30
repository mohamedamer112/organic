"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, weight?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateWeight: (id: string, weight: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

function computeLineTotal(item: Omit<CartItem, "lineTotal">): number {
  if (item.weight) {
    return item.unitPrice * item.weight;
  }
  return item.unitPrice * item.quantity;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, weight) => {
        const isKg = product.unit === "كيلو";
        const cartId = product.isSpecial ? `${product.id}-${quantity}` : product.id;

        set((state) => {
          const existing = state.items.find((i) => i.id === cartId);

          if (existing) {
            const updated = {
              ...existing,
              quantity: isKg ? existing.quantity : existing.quantity + quantity,
              weight: isKg ? (weight ?? existing.weight ?? 1) : existing.weight,
            };
            updated.lineTotal = computeLineTotal(updated);
            return {
              items: state.items.map((i) => (i.id === cartId ? updated : i)),
            };
          }

          const unitPrice = product.isSpecial
            ? product.specialOptions?.find((o) => o.qty === quantity)?.price ?? product.price
            : product.price;

          const newItem: CartItem = {
            id: cartId,
            productId: product.id,
            name: product.name,
            image: product.image,
            unit: product.unit,
            unitPrice: product.isSpecial ? unitPrice / quantity : unitPrice,
            quantity,
            weight: isKg ? weight ?? 1 : undefined,
            lineTotal: 0,
          };
          newItem.lineTotal = product.isSpecial ? unitPrice : computeLineTotal(newItem);

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity, lineTotal: computeLineTotal({ ...i, quantity }) } : i
          ),
        }));
      },

      updateWeight: (id, weight) => {
        if (weight < 0.25) return;
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, weight, lineTotal: computeLineTotal({ ...i, weight }) } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + (i.weight ? 1 : i.quantity), 0),

      totalPrice: () => get().items.reduce((sum, i) => sum + i.lineTotal, 0),
    }),
    {
      name: "organic-cart",
    }
  )
);
