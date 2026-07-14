import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import { checkPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Issues a short-lived token so the browser can upload straight to Blob storage.
 *
 * Uploads used to POST the file through /api/upload, but a serverless function
 * body is capped at 4.5MB, so any photo bigger than that died with a 413 —
 * which is most photos straight off a phone. Going browser-to-Blob sidesteps
 * the function entirely.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        // The browser sends the admin password as its client payload; this is
        // the only thing standing between the public and our Blob store.
        if (!checkPassword(clientPayload)) {
          throw new Error("Unauthorized");
        }
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic"],
          addRandomSuffix: true,
          maximumSizeInBytes: 25 * 1024 * 1024,
        };
      },
      onUploadCompleted: async () => {
        // Nothing to do — the admin puts the returned URL into the content JSON.
      },
    });

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Upload failed" },
      { status: 400 }
    );
  }
}
