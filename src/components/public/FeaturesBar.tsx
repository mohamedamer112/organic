const FEATURES = [
  { icon: "🌾", title: "100% حبة كاملة", desc: "مخبوزاتنا من دقيق الحبة الكاملة" },
  { icon: "🚫", title: "بدون إضافات", desc: "لا مواد حافظة ولا ألوان صناعية" },
  { icon: "🚚", title: "توصيل سريع", desc: "نوصل طازج لباب بيتك" },
  { icon: "💚", title: "طعم طبيعي", desc: "جودة حقيقية وثقة تدوم" },
];

export default function FeaturesBar() {
  return (
    <section className="bg-cream py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="text-center">
            <div className="mb-3 text-[48px] leading-none text-olive">{f.icon}</div>
            <h3 className="font-cairo text-lg font-semibold text-charcoal">{f.title}</h3>
            <p className="mt-1 font-tajawal text-sm text-softbrown">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
