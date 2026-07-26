import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });
    }

    const body = await request.json();
    const { image } = body as { image: string };

    if (!image) {
      return NextResponse.json({ error: "لا توجد صورة" }, { status: 400 });
    }

    const url = await uploadImage(image);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("خطأ في رفع الصورة:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء رفع الصورة" }, { status: 500 });
  }
}
