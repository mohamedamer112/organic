"use server";

import { prisma } from "@/lib/prisma";
import { CartItem } from "@/types";
import { revalidatePath } from "next/cache";

export async function logOrder(
  items: CartItem[],
  total: number,
  customerName: string,
  customerPhone: string,
  customerAddress: string,
  notes: string
) {
  try {
    const combinedNotes = [
      `الاسم: ${customerName}`,
      `العنوان: ${customerAddress}`,
      notes ? `ملاحظات: ${notes}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const order = await prisma.orderLog.create({
      data: {
        items: items as any,
        total,
        notes: combinedNotes,
        customerPhone: customerPhone || null,
      },
    });
    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("خطأ في تسجيل الطلب:", error);
    return { success: false, error: "تعذر تسجيل الطلب" };
  }
}

export async function getOrders() {
  try {
    return await prisma.orderLog.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.error("خطأ في جلب الطلبات:", error);
    return [];
  }
}

export async function getDashboardStats() {
  try {
    const [productsCount, ordersCount, todayOrdersCount] = await Promise.all([
      prisma.product.count(),
      prisma.orderLog.count(),
      prisma.orderLog.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);
    return { productsCount, ordersCount, todayOrdersCount };
  } catch (error) {
    console.error("خطأ في جلب الإحصائيات:", error);
    return { productsCount: 0, ordersCount: 0, todayOrdersCount: 0 };
  }
}
