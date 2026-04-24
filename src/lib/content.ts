import { put, list } from "@vercel/blob";
import { readFile } from "fs/promises";
import { join } from "path";

const LOCAL_PATH = join(process.cwd(), "src/data/content.json");
const BLOB_NAME = "content.json";

export type ContentData = {
  site: { name: string; tagline: string };
  home: {
    hero: { heading: string; subheading: string; description: string; image: string };
    welcome: { heading: string; text: string; image: string };
    highlights: { title: string; description: string; icon: string }[];
  };
  about: {
    hero: { heading: string; image: string };
    history: { heading: string; text: string; image: string };
    facilities: { heading: string; text: string; image: string };
    season: { heading: string; text: string };
    location: {
      heading: string;
      address: string;
      description: string;
      mapUrl: string;
      coordinates: { lat: number; lng: number };
    };
  };
  membership: {
    hero: { heading: string; description: string; image: string };
    plans: {
      name: string;
      price: string;
      period: string;
      features: string[];
      popular?: boolean;
    }[];
    guestFee: { price: string; description: string };
    contact: {
      heading: string;
      text: string;
      contacts: { name: string; role: string; email: string }[];
    };
  };
  blog: {
    title: string;
    description: string;
    posts: {
      slug: string;
      title: string;
      excerpt: string;
      date: string;
      author: string;
      image: string;
      tags: string[];
      content: string;
    }[];
  };
  footer: { email: string; location: string; tagline: string };
};

export async function getContent(): Promise<ContentData> {
  // In production, read from Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: BLOB_NAME });
      const blob = blobs.find((b) => b.pathname === BLOB_NAME);
      if (blob) {
        const res = await fetch(blob.url, { cache: "no-store" });
        return res.json();
      }
    } catch (e) {
      console.error("Failed to read from Blob, falling back to local", e);
    }
  }

  // Fallback: read local file (dev or first deploy)
  const raw = await readFile(LOCAL_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function saveContent(data: ContentData): Promise<void> {
  const json = JSON.stringify(data, null, 2);

  // Save to Vercel Blob in production
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(BLOB_NAME, json, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });
  }

  // Also write local file (works in dev, no-op fail in production is fine)
  try {
    const { writeFile } = await import("fs/promises");
    await writeFile(LOCAL_PATH, json, "utf-8");
  } catch {
    // Expected to fail in production serverless
  }
}
