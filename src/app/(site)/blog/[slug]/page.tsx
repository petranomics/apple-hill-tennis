import Link from "next/link";
import { notFound } from "next/navigation";
import content from "@/data/content.json";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return content.blog.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
        </div>
      </section>

      {/* Article body */}
      <article className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none text-bark leading-relaxed blog-content">
            <MarkdownContent content={post.content} />
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

function MarkdownContent({ content: md }: { content: string }) {
  // Simple markdown-to-HTML for blog posts
  const html = md
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-8 border-sage/30" />')
    // Headings
    .replace(
      /^## (.+)$/gm,
      '<h2 class="text-2xl font-bold text-forest mt-10 mb-4">$1</h2>'
    )
    .replace(
      /^### (.+)$/gm,
      '<h3 class="text-xl font-bold text-forest mt-8 mb-3">$1</h3>'
    )
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Links
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" class="text-clay hover:text-clay-light underline underline-offset-2 transition-colors">$1</a>'
    )
    // Paragraphs (double newline)
    .split(/\n\n/)
    .map((block) => {
      if (
        block.startsWith("<h") ||
        block.startsWith("<hr") ||
        block.startsWith("<ul") ||
        block.startsWith("<ol")
      )
        return block;
      return `<p class="mb-6 text-bark-light leading-relaxed">${block}</p>`;
    })
    .join("\n");

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
