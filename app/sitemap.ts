export default function sitemap() {
  const now = new Date();
  return [
    { url: "https://galactis.ai", lastModified: now, priority: 1.0 },
    { url: "https://galactis.ai/products/itam", lastModified: now, priority: 0.9 },
  ];
}

