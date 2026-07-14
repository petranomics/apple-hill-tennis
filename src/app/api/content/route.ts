import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContent, saveContent } from "@/lib/content";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  try {
    await saveContent(body);
  } catch (e) {
    console.error("Failed to save content", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to save content" },
      { status: 500 }
    );
  }

  // Revalidate all pages so changes appear immediately
  revalidatePath("/", "layout");

  return NextResponse.json({ success: true });
}
