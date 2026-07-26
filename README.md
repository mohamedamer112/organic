# 🌾 ORGANIC FOOD — موقع متكامل (Next.js 14 + Admin Dashboard)

موقع متكامل لمخبوزات أورجانيك، مبني بـ Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma + PostgreSQL + NextAuth.js + Cloudinary + Zustand، بالكامل باللغة العربية (RTL)، مع لوحة تحكم كاملة للأدمن ونظام طلبات عبر واتساب.

## 🚀 التشغيل محلياً (Local Setup)

1. **تثبيت الحزم:**
   ```bash
   npm install
   ```

2. **إعداد متغيرات البيئة:**
   ```bash
   cp .env.local.example .env.local
   ```
   ثم عدّل القيم التالية في `.env.local`:
   - `DATABASE_URL` — رابط قاعدة بيانات PostgreSQL (يمكنك استخدام [Neon](https://neon.tech) أو [Supabase](https://supabase.com) أو Vercel Postgres مجاناً)
   - `NEXTAUTH_SECRET` — أي نص عشوائي طويل (يمكن توليده بـ `openssl rand -base64 32`)
   - `CLOUDINARY_*` — بيانات حسابك على [Cloudinary](https://cloudinary.com) (مجاني) لرفع الصور
   - `NEXT_PUBLIC_WHATSAPP_PHONE` — رقم واتساب المتجر بصيغة دولية بدون + مثل `201234567890`

3. **إنشاء قاعدة البيانات والجداول:**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **زرع البيانات الأولية (10 منتجات + حساب أدمن):**
   ```bash
   npm run seed
   ```
   بيانات دخول الأدمن الافتراضية: `admin@organicfood.com` / `admin123` (غيّرها فوراً بعد أول دخول عبر متغيرات `ADMIN_EMAIL`/`ADMIN_PASSWORD` قبل الزرع، أو من قاعدة البيانات مباشرة).

5. **تشغيل السيرفر المحلي:**
   ```bash
   npm run dev
   ```
   افتح [http://localhost:3000](http://localhost:3000)

## 📦 رفع المشروع على GitHub

```bash
git init
git add .
git commit -m "Initial commit - ORGANIC FOOD website"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

## ▲ النشر على Vercel

1. اذهب إلى [vercel.com/new](https://vercel.com/new) واستورد الريبو من GitHub.
2. أضف نفس متغيرات البيئة الموجودة في `.env.local` من تبويب **Environment Variables** في إعدادات المشروع على Vercel (لا ترفع ملف `.env.local` أبداً على GitHub — هو مستثنى بالفعل في `.gitignore`).
3. تأكد أن `NEXTAUTH_URL` يساوي رابط موقعك على Vercel (مثلاً `https://your-project.vercel.app`) بعد أول نشر.
4. اضغط **Deploy**. الأمر `prisma generate` سيعمل تلقائياً ضمن سكريبت `build` في `package.json`.
5. بعد أول نشر ناجح، شغّل الهجرة والزرع على قاعدة البيانات الفعلية (من جهازك، مع تعديل `DATABASE_URL` مؤقتاً لتشير لقاعدة بيانات الإنتاج):
   ```bash
   npx prisma migrate deploy
   npm run seed
   ```

## 🖼️ ملاحظة عن الصور

تم استخدام صورة placeholder مؤقتة في `public/images/placeholder.jpg` في كل الأماكن (الهيرو، المعرض، آراء العملاء، من نحن). استبدلها بصور حقيقية للمخبز والمنتجات قبل الإطلاق النهائي، أو ارفع صور المنتجات مباشرة من لوحة التحكم (`/admin/products`) وسيتم رفعها لـ Cloudinary تلقائياً.

## 🔑 تسجيل الدخول للوحة التحكم

الرابط: `/admin/login`

## 🧱 هيكل المشروع

راجع مجلد `src/` — الصفحات العامة في `src/app`, صفحات الأدمن في `src/app/admin`, المكونات في `src/components`, والمنطق البرمجي (Server Actions, Prisma, Auth) في `src/lib`.

## ✅ الميزات المنفذة

- صفحة رئيسية كاملة (Hero, مميزات, منتجات مميزة, من نحن, معرض, آراء عملاء, CTA)
- صفحة منتجات مع فلترة حسب الفئة
- سلة مشتريات مع حفظ في localStorage وحساب سعر الفطير المشلتت (1/2 قطعة) والمنتجات بالكيلو (ستيبر وزن) والمنتجات بالكيس (كمية ثابتة)
- إرسال الطلب عبر واتساب مع تسجيله في قاعدة البيانات أولاً
- تسجيل دخول الأدمن (NextAuth + bcrypt) وحماية مسارات `/admin/*` عبر middleware
- لوحة تحكم: إحصائيات، إدارة منتجات (إضافة/تعديل/حذف + رفع صور Cloudinary)، سجل الطلبات مع فلترة بالتاريخ وتصدير CSV
- تصميم متجاوب بالكامل (Mobile/Tablet/Desktop) بالألوان والخطوط المحددة في وثيقة التصميم
