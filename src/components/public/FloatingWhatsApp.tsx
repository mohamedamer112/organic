const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "201002882634";

export default function FloatingWhatsApp() {
  const message = encodeURIComponent("مرحباً، أريد الاستفسار عن مخبوزات ORGANIC FOOD");

  return (
    <a
      href={`https://wa.me/${WHATSAPP_PHONE}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-2xl text-white shadow-lg transition hover:scale-110 hover:bg-whatsappDark"
    >
      📲
    </a>
  );
}
