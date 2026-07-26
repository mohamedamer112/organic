export interface SpecialOption {
  qty: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string; // "كيس" | "كيلو" | "قطعة"
  image: string;
  isSpecial: boolean;
  specialOptions: SpecialOption[] | null;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CartItem {
  id: string; // product id, or `${productId}-${qty}` for special options
  productId: string;
  name: string;
  image: string;
  unit: string;
  unitPrice: number; // price per single unit / per kg
  quantity: number; // for قطعة/كيس items, or the special option qty
  weight?: number; // for كيلو items: 0.5 / 1 / 1.5 / 2 ...
  lineTotal: number;
}

export interface OrderLogItem {
  id: string;
  items: CartItem[];
  total: number;
  notes: string | null;
  customerPhone: string | null;
  createdAt: Date | string;
}

export const CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "toast", label: "خبز توست" },
  { value: "fino", label: "خبز فينو" },
  { value: "kaiser", label: "خبز كايزر" },
  { value: "bread", label: "خبز شامي" },
  { value: "pastry", label: "معجنات" },
  { value: "crisps", label: "مقرمشات" },
  { value: "pie", label: "فطير" },
];
