import { put, list, del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";

const unauthorized = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();

  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const blob = await put(`images/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url });
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();

  const { blobs } = await list({ prefix: "images/" });

  const images = blobs.map((b) => ({
    url: b.url,
    pathname: b.pathname,
    size: b.size,
    uploadedAt: b.uploadedAt,
  }));

  return NextResponse.json({ images });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();

  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "No url provided" }, { status: 400 });
  }

  await del(url);
  return NextResponse.json({ success: true });
}
