import { getOrders } from "@/lib/orders";
import OrderTable from "@/components/admin/OrderTable";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="mb-6 font-cairo text-2xl font-bold text-charcoal">سجل الطلبات</h1>
      <OrderTable orders={orders as any} />
    </div>
  );
}
