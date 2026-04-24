import Link from "next/link";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Apple Hill Tennis Club",
  description:
    "News, stories, and updates from Apple Hill Tennis Club — southern Vermont's premier clay court tennis community in West Dover, near Mount Snow.",
  keywords: [
    "southern vermont tennis",
    "west dover tennis",
    "clay court tennis vermont",
    "mount snow tennis",
    "green mountain tennis",
    "apple hill tennis blog",
  ],
};

export default async function BlogPage() {
  const content = await getContent();
  const { blog } = content;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-forest text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('/images/green-mountains-2.jpg')` }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {blog.title}
          </h1>
          <p className="text-lg text-sage-light mt-4 max-w-2xl mx-auto">
            {blog.description}
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-10">
            {blog.posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-56 md:h-72 object-cover"
                    />
                  )}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 text-sm text-bark-light mb-3">
                      <time dateTime={post.date}>
                        {new Date(post.date + "T00:00:00").toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                      {post.author && (
                        <>
                          <span className="text-sage">|</span>
                          <span>{post.author}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-forest mb-3">
                      {post.title}
                    </h2>
                    <p className="text-bark-light leading-relaxed">
                      {post.excerpt}
                    </p>
                    <span className="inline-block mt-4 text-clay font-semibold text-sm">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {blog.posts.length === 0 && (
            <p className="text-center text-bark-light text-lg py-12">
              No posts yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </>
  );
}
