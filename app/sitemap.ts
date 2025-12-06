import { getAllPosts } from "@/lib/hygraph";

const BASE_URL = "https://galactis.ai";

export default async function sitemap() {
  const now = new Date();

  // Static pages
  const staticPages = [
    { url: BASE_URL, lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE_URL}/products/itam`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/products/ai-agents`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/products/network-monitoring`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/pricing`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/company`, lastModified: now, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/contact`, lastModified: now, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/resources/blog`, lastModified: now, priority: 0.8, changeFrequency: "daily" },
    { url: `${BASE_URL}/careers`, lastModified: now, priority: 0.6, changeFrequency: "weekly" },
    { url: `${BASE_URL}/security`, lastModified: now, priority: 0.6, changeFrequency: "monthly" },
    // Solutions
    { url: `${BASE_URL}/solutions/healthcare`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/solutions/financial-services`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/solutions/manufacturing`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/solutions/retail-ecommerce`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/solutions/government`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/solutions/telecommunications`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
  ];

  // Dynamic blog posts from Hygraph
  let blogPages: {
    url: string;
    lastModified: Date;
    priority: number;
    changeFrequency: string;
  }[] = [];

  try {
    const posts = await getAllPosts(100);
    blogPages = posts.map((post) => ({
      url: `${BASE_URL}/resources/blog/${post.slug}`,
      lastModified: new Date(post.publishedDate),
      priority: 0.7,
      changeFrequency: "monthly",
    }));
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error);
  }

  return [...staticPages, ...blogPages];
}
