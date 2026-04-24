import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContent, saveContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  await saveContent(body);

  // Revalidate all pages so changes appear immediately
  revalidatePath("/", "layout");

  return NextResponse.json({ success: true });
}
