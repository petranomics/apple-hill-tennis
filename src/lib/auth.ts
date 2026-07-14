import { timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";

export const ADMIN_HEADER = "x-admin-password";

export function checkPassword(supplied: string | null | undefined): boolean {
  const expected = process.env.ADMIN_PASSWORD;

  // With no password configured there is nothing to authenticate against, so
  // deny rather than leaving the write endpoints open.
  if (!expected || !supplied) return false;

  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isAuthed(req: NextRequest): boolean {
  return checkPassword(req.headers.get(ADMIN_HEADER));
}
