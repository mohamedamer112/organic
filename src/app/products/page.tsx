import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import FloatingWhatsApp from "@/components/public/FloatingWhatsApp";
import { getProducts } from "@/lib/products";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main>
        <section
          className="relative flex h-[300px] items-center"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(85,107,47,0.85) 0%, rgba(54,69,47,0.75) 100%), url('/images/placeholder.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-6">
            <p className="font-tajawal text-sm text-cream">الرئيسية &gt; المنتجات</p>
            <h1 className="mt-2 font-cairo text-3xl font-bold text-white sm:text-[42px]">
              جميع المخبوزات
            </h1>
          </div>
        </section>

        <ProductsClient products={products as any} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
