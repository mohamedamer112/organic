import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  color?: string;
}

export default function StatsCard({ icon: Icon, label, value, color = "#556B2F" }: StatsCardProps) {
  return (
    <div className="rounded-card border border-border bg-white p-6">
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}1A` }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      <p className="font-tajawal text-sm text-softbrown">{label}</p>
      <p className="mt-1 font-cairo text-3xl font-bold text-charcoal">{value}</p>
    </div>
  );
}
