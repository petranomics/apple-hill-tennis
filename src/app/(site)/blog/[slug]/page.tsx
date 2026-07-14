import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import PostGallery, { type GalleryPhoto } from "@/components/PostGallery";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const post = content.blog.posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Apple Hill Tennis Club`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const content = await getContent();
  const post = content.blog.posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-forest text-white overflow-hidden">
        {post.image && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('${post.image}')` }}
          />
        )}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <div className="flex items-center justify-center gap-3 text-sm text-sage-light mb-4">
            <time dateTime={post.date}>
              {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.author && (
              <>
                <span className="text-sage">|</span>
                <span>{post.author}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Article body */}
      <article className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none text-bark leading-relaxed blog-content">
            <MarkdownContent content={post.content} postTitle={post.title} />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-sage/20">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-cream-dark text-bark-light text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="text-forest font-semibold hover:text-forest-light transition-colors"
            >
              &larr; Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

const IMAGE_BLOCK = /^!\[(.*?)\]\((.+?)\)$/;

/**
 * Renders the post body. Photos are pulled out of the markdown and handed to the
 * gallery component; a run of consecutive photos becomes one gallery rather than
 * a stack of full-width images, which is how club photo posts actually read.
 */
function MarkdownContent({ content: md, postTitle }: { content: string; postTitle?: string }) {
  const blocks = md.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);

  // Group the blocks into text runs and photo runs, preserving order.
  const nodes: ({ kind: "text"; blocks: string[] } | { kind: "photos"; photos: GalleryPhoto[] })[] = [];

  for (const block of blocks) {
    const match = block.match(IMAGE_BLOCK);
    const last = nodes[nodes.length - 1];

    if (match) {
      const photo = { url: match[2], caption: match[1].trim() };
      if (last?.kind === "photos") last.photos.push(photo);
      else nodes.push({ kind: "photos", photos: [photo] });
    } else {
      if (last?.kind === "text") last.blocks.push(block);
      else nodes.push({ kind: "text", blocks: [block] });
    }
  }

  return (
    <>
      {nodes.map((node, i) =>
        node.kind === "photos" ? (
          <PostGallery key={i} photos={node.photos} postTitle={postTitle} />
        ) : (
          <div key={i} dangerouslySetInnerHTML={{ __html: renderText(node.blocks) }} />
        )
      )}
    </>
  );
}

function renderText(blocks: string[]): string {
  return blocks
    .map((block) =>
      block
        .replace(/^---$/gm, '<hr class="my-8 border-sage/30" />')
        .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-forest mt-10 mb-4">$1</h2>')
        .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-forest mt-8 mb-3">$1</h3>')
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(
          /\[(.+?)\]\((.+?)\)/g,
          '<a href="$2" class="text-clay hover:text-clay-hover underline underline-offset-2 transition-colors">$1</a>'
        )
    )
    .map((block) =>
      block.startsWith("<h") || block.startsWith("<hr") || block.startsWith("<ul") || block.startsWith("<ol")
        ? block
        : `<p class="mb-6 text-bark-light leading-relaxed">${block}</p>`
    )
    .join("\n");
}
