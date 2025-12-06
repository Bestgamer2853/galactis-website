import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  getPostBySlug,
  getAllPostSlugs,
  formatPostDate,
  calculateReadTime,
} from "@/lib/hygraph";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Galactis.ai Blog",
    };
  }

  return {
    title: `${post.title} | Galactis.ai Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedDate,
    },
  };
}

// Revalidate every hour
export const revalidate = 3600;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readTime = post.content
    ? calculateReadTime(post.content)
    : 5;

  // Structured data for SEO (Article schema)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    dateModified: post.updatedAt || post.publishedDate,
    author: {
      "@type": "Organization",
      name: "Galactis.ai",
    },
    publisher: {
      "@type": "Organization",
      name: "Galactis.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://galactis.ai/galactis-logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://galactis.ai/resources/blog/${post.slug}`,
    },
    wordCount: post.content?.split(/\s+/).length || 0,
    articleSection: "Technology",
    ...(post.coverImage?.url && { image: post.coverImage.url }),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <JsonLd data={articleJsonLd} />
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/resources/blog"
                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="truncate text-zinc-900 dark:text-zinc-100">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          {post.category && (
            <span className="mb-4 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
              {post.category}
            </span>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">
            {post.excerpt}
          </p>

          {/* Meta info */}
          <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-zinc-200 py-4 dark:border-zinc-800">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.picture?.url && (
                  <Image
                    src={post.author.picture.url}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {post.author.name}
                  </p>
                  {post.author.title && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {post.author.title}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <time>{formatPostDate(post.publishedDate)}</time>
              <span>·</span>
              <span>{readTime} min read</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <figure className="mb-12 overflow-hidden rounded-2xl">
            <Image
              src={post.coverImage.url}
              alt={post.title}
              width={post.coverImage.width || 1200}
              height={post.coverImage.height || 630}
              className="w-full object-cover"
              priority
            />
          </figure>
        )}

        {/* Article Content */}
        <article className="prose prose-lg prose-zinc mx-auto dark:prose-invert prose-headings:font-bold prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-purple-400">
          {/* Render content - supports HTML or plain text */}
          {post.content?.includes("<") ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="whitespace-pre-wrap">{post.content}</div>
          )}
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Tags
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to all articles
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

