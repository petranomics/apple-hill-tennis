import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const CONTENT_PATH = join(process.cwd(), "src/data/content.json");

export async function GET() {
  const raw = await readFile(CONTENT_PATH, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  await writeFile(CONTENT_PATH, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}
