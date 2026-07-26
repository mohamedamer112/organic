import { v2 as cloudinary } from "cloudinary";

const isConfigured =
  !!process.env.CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET;

if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export const isCloudinaryConfigured = isConfigured;

export async function uploadImage(base64: string): Promise<string> {
  if (!isConfigured) {
    // Fallback: return the base64 data URI itself so the app keeps working
    // without Cloudinary configured (e.g. local dev without keys).
    return base64;
  }
  const result = await cloudinary.uploader.upload(base64, {
    folder: "organic-food/products",
  });
  return result.secure_url;
}

export async function deleteImage(publicId: string): Promise<void> {
  if (!isConfigured || !publicId) return;
  await cloudinary.uploader.destroy(publicId);
}
