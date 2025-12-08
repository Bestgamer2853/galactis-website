import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { getAllPosts, formatPostDate, BlogPost } from "@/lib/hygraph";

export const metadata = {
  title: "Blog | Galactis.ai",
  description:
    "Thought leadership and technical tutorials from the Galactis.ai engineering, product, and strategy teams.",
};

// Revalidate every hour for fresh content
export const revalidate = 3600;

// Fallback posts for when Hygraph is not configured
const fallbackPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Five Essential Pillars of Technology Value Optimization",
    slug: "five-pillars-technology-value-optimization",
    excerpt:
      "How CIOs align IT spend with business outcomes using continuous benchmarking and AI-driven insights.",
    publishedDate: "2025-10-15",
  },
  {
    id: "2",
    title: "Architecting Agentic Workflows for High-Regulation Sectors",
    slug: "architecting-agentic-workflows",
    excerpt:
      "Design patterns for orchestrating AI agents with human approvals, compliance guardrails, and audit trails.",
    publishedDate: "2025-09-22",
  },
  {
    id: "3",
    title: "Closing the Loop on Network Automation",
    slug: "closing-loop-network-automation",
    excerpt:
      "Implementing observability-driven runbooks that repair incidents autonomously and capture learning back into the platform.",
    publishedDate: "2025-08-10",
  },
];

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:border-purple-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-purple-700">
      <div className="p-6">
        <time className="text-xs text-zinc-500 dark:text-zinc-400">
          {formatPostDate(post.publishedDate)}
        </time>
        <h2 className="mt-3 text-xl font-semibold text-zinc-900 transition-colors group-hover:text-purple-600 dark:text-zinc-100 dark:group-hover:text-purple-400">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>
        <Link
          href={`/resources/blog/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
          Read article
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default async function BlogPage() {
  // Fetch posts from Hygraph
  let posts = await getAllPosts(12);

  // Debug: Log what we got
  if (process.env.NODE_ENV === "development") {
    console.log(`[Blog Page] Fetched ${posts.length} posts from Hygraph`);
    if (posts.length > 0) {
      console.log(`[Blog Page] Post titles:`, posts.map((p) => p.title));
    } else {
      console.warn("[Blog Page] No posts from Hygraph - check if endpoint is configured");
    }
  }

  // Use fallback if no posts returned (Hygraph not configured)
  if (posts.length === 0) {
    console.warn("[Blog Page] Using fallback posts - Hygraph posts not available");
    posts = fallbackPosts;
  }

  // Structured data for blog listing (improves SEO)
  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Galactis.ai Blog",
    description:
      "Thought leadership and technical tutorials from the Galactis.ai engineering, product, and strategy teams.",
    url: "https://galactis.ai/resources/blog",
    publisher: {
      "@type": "Organization",
      name: "Galactis.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://galactis.ai/galactis-logo.svg",
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedDate,
      url: `https://galactis.ai/resources/blog/${post.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <JsonLd data={blogListJsonLd} />
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Thought leadership and technical tutorials from the Galactis.ai
            engineering, product, and strategy teams.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Load More (optional - for pagination) */}
        {posts.length >= 12 && (
          <div className="mt-12 text-center">
            <button className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
              Load more articles
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
