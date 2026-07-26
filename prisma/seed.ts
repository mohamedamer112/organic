import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  {
    name: "توست طري",
    category: "toast",
    description: "800 جرام — 28 شريحة طازجة بدون إضافات",
    price: 90,
    unit: "كيس",
    image: "/images/placeholder.jpg",
    isSpecial: false,
  },
  {
    name: "خبز كايزر وسط",
    category: "kaiser",
    description: "كيس 4 قطع — طري بالحبة الكاملة",
    price: 25,
    unit: "كيس",
    image: "/images/placeholder.jpg",
    isSpecial: false,
  },
  {
    name: "خبز فينو بالشوفان",
    category: "fino",
    description: "كيس 4 رغيف — مغطى بالشوفان الكامل",
    price: 30,
    unit: "كيس",
    image: "/images/placeholder.jpg",
    isSpecial: false,
  },
  {
    name: "خبز فينو ساده",
    category: "fino",
    description: "كيس 4 رغيف — كلاسيكي بالحبة الكاملة",
    price: 30,
    unit: "كيس",
    image: "/images/placeholder.jpg",
    isSpecial: false,
  },
  {
    name: "خبز شامي",
    category: "bread",
    description: "كيس 4 رغيف — من دقيق الذرة حبة كاملة",
    price: 20,
    unit: "كيس",
    image: "/images/placeholder.jpg",
    isSpecial: false,
  },
  {
    name: "مانيه بالعجوه",
    category: "pastry",
    description: "حبة كاملة — محشوة عجوة طبيعية",
    price: 280,
    unit: "كيلو",
    image: "/images/placeholder.jpg",
    isSpecial: false,
  },
  {
    name: "مانيه ساده",
    category: "pastry",
    description: "حبة كاملة — مقرمشة صحية",
    price: 280,
    unit: "كيلو",
    image: "/images/placeholder.jpg",
    isSpecial: false,
  },
  {
    name: "بقسماط الحبة الكاملة",
    category: "crisps",
    description: "مقرمش صحي مثالي للشاي واللبن",
    price: 220,
    unit: "كيلو",
    image: "/images/placeholder.jpg",
    isSpecial: false,
  },
  {
    name: "باتون ساليه",
    category: "crisps",
    description: "عصي مقرمشة بالحبة الكاملة",
    price: 280,
    unit: "كيلو",
    image: "/images/placeholder.jpg",
    isSpecial: false,
  },
  {
    name: "فطير مشلتت",
    category: "pie",
    description: "حبة كاملة — فطير طبقات صحي",
    price: 175,
    unit: "قطعة",
    image: "/images/placeholder.jpg",
    isSpecial: true,
    specialOptions: [
      { qty: 1, price: 175 },
      { qty: 2, price: 300 },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  for (const p of products) {
    await prisma.product.create({ data: p as any });
  }

  const email = process.env.ADMIN_EMAIL || "admin@organicfood.com";
  const rawPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hashed = await bcrypt.hash(rawPassword, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashed,
      name: "مدير المتجر",
    },
  });

  console.log("✅ Seed complete. Admin login:", email, "/", rawPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
