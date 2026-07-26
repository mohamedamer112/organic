"use client";

interface DeleteConfirmProps {
  open: boolean;
  productName: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirm({ open, productName, loading, onCancel, onConfirm }: DeleteConfirmProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 px-4">
      <div className="w-full max-w-sm rounded-card bg-white p-6 text-center">
        <p className="font-cairo text-lg font-semibold text-charcoal">تأكيد الحذف</p>
        <p className="mt-2 font-tajawal text-sm text-softbrown">
          هل أنت متأكد من حذف &quot;{productName}&quot;؟ لا يمكن التراجع عن هذا الإجراء.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-btn border border-wheat px-4 py-2 font-cairo text-sm font-medium text-charcoal hover:bg-cream"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-btn bg-[#E53935] px-4 py-2 font-cairo text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "جاري الحذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}
