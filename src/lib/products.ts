"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { getCloudinaryPublicId } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const productSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  category: z.string().min(1, "الفئة مطلوبة"),
  description: z.string().min(1, "الوصف مطلوب"),
  price: z.coerce.number().positive("السعر يجب أن يكون أكبر من صفر"),
  unit: z.string().min(1, "الوحدة مطلوبة"),
  isSpecial: z.coerce.boolean().optional().default(false),
});

export async function getProducts() {
  try {
    return await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("خطأ في جلب المنتجات:", error);
    return [];
  }
}

export async function getAllProductsAdmin() {
  try {
    return await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.error("خطأ في جلب المنتجات:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    return await prisma.product.findUnique({ where: { id } });
  } catch (error) {
    console.error("خطأ في جلب المنتج:", error);
    return null;
  }
}

export async function createProduct(formData: FormData) {
  try {
    const parsed = productSchema.safeParse({
      name: formData.get("name"),
      category: formData.get("category"),
      description: formData.get("description"),
      price: formData.get("price"),
      unit: formData.get("unit"),
      isSpecial: formData.get("isSpecial") === "true",
    });

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const imageBase64 = formData.get("image") as string | null;
    const imageUrl = imageBase64
      ? await uploadImage(imageBase64)
      : "/images/placeholder.jpg";

    const specialOptionsRaw = formData.get("specialOptions") as string | null;
    const specialOptions = specialOptionsRaw ? JSON.parse(specialOptionsRaw) : null;

    await prisma.product.create({
      data: {
        ...parsed.data,
        image: imageUrl,
        specialOptions,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("خطأ في إنشاء المنتج:", error);
    return { success: false, error: "حدث خطأ أثناء إنشاء المنتج" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const parsed = productSchema.safeParse({
      name: formData.get("name"),
      category: formData.get("category"),
      description: formData.get("description"),
      price: formData.get("price"),
      unit: formData.get("unit"),
      isSpecial: formData.get("isSpecial") === "true",
    });

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "المنتج غير موجود" };
    }

    const newImageBase64 = formData.get("image") as string | null;
    let imageUrl = existing.image;

    if (newImageBase64) {
      const oldPublicId = getCloudinaryPublicId(existing.image);
      if (oldPublicId) {
        await deleteImage(oldPublicId);
      }
      imageUrl = await uploadImage(newImageBase64);
    }

    const specialOptionsRaw = formData.get("specialOptions") as string | null;
    const specialOptions = specialOptionsRaw ? JSON.parse(specialOptionsRaw) : existing.specialOptions;

    await prisma.product.update({
      where: { id },
      data: {
        ...parsed.data,
        image: imageUrl,
        specialOptions,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("خطأ في تعديل المنتج:", error);
    return { success: false, error: "حدث خطأ أثناء تعديل المنتج" };
  }
}

export async function deleteProduct(id: string) {
  try {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (existing) {
      const publicId = getCloudinaryPublicId(existing.image);
      if (publicId) {
        await deleteImage(publicId);
      }
    }

    await prisma.product.delete({ where: { id } });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("خطأ في حذف المنتج:", error);
    return { success: false, error: "حدث خطأ أثناء حذف المنتج" };
  }
}
