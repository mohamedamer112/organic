import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  comment: string;
  avatar: string;
}

export default function TestimonialCard({ name, comment, avatar }: TestimonialCardProps) {
  return (
    <div className="rounded-card bg-white p-8 shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <Image src={avatar} alt={name} fill className="object-cover" />
        </div>
        <div>
          <p className="font-cairo text-lg font-semibold text-charcoal">{name}</p>
          <p className="text-terracotta">⭐⭐⭐⭐⭐</p>
        </div>
      </div>
      <p className="mt-4 font-tajawal text-base text-charcoal">{comment}</p>
    </div>
  );
}
