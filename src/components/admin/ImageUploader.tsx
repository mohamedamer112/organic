"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";

interface ImageUploaderProps {
  currentImage?: string;
  onImageSelected: (base64: string | null) => void;
}

export default function ImageUploader({ currentImage, onImageSelected }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onImageSelected(base64);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        className="relative flex h-48 w-48 cursor-pointer items-center justify-center overflow-hidden rounded-card border-2 border-dashed border-wheat bg-cream"
      >
        {preview ? (
          <Image src={preview} alt="معاينة الصورة" fill className="object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-softbrown">
            <Upload size={28} />
            <span className="font-tajawal text-sm">اختر صورة</span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {currentImage && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 font-tajawal text-sm text-olive hover:underline"
        >
          تغيير الصورة
        </button>
      )}
    </div>
  );
}
