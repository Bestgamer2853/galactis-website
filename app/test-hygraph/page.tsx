import { getAllPosts } from "@/lib/hygraph";

export default async function TestHygraphPage() {
  const posts = await getAllPosts(10);
  const endpoint = process.env.HYGRAPH_ENDPOINT || "Not set";
  const tokenConfigured = !!process.env.HYGRAPH_TOKEN;

  return (
    <div className="min-h-screen bg-white dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Hygraph Connection Test</h1>
        
        <div className="space-y-4 mb-8">
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold mb-2">Configuration Status</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Endpoint:</strong>{" "}
                <span className={endpoint !== "Not set" ? "text-green-600" : "text-red-600"}>
                  {endpoint !== "Not set" ? "✅ Configured" : "❌ Not set"}
                </span>
                <br />
                <code className="text-xs mt-1 block">{endpoint}</code>
              </li>
              <li>
                <strong>Token:</strong>{" "}
                <span className={tokenConfigured ? "text-green-600" : "text-yellow-600"}>
                  {tokenConfigured ? "✅ Configured" : "⚠️ Not set (optional)"}
                </span>
              </li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold mb-2">Query Results</h2>
            <p className="mb-2">
              <strong>Posts Found:</strong>{" "}
              <span className={posts.length > 0 ? "text-green-600" : "text-red-600"}>
                {posts.length}
              </span>
            </p>
            
            {posts.length > 0 ? (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Posts from Hygraph:</h3>
                <ul className="space-y-2">
                  {posts.map((post) => (
                    <li key={post.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <div className="font-semibold">{post.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Slug: {post.slug}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Published: {post.publishedDate}
                      </div>
                      {post.excerpt && (
                        <div className="text-sm mt-1">{post.excerpt}</div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <p className="text-sm">
                  ⚠️ No posts found. This could mean:
                </p>
                <ul className="text-sm mt-2 list-disc list-inside space-y-1">
                  <li>No published posts in Hygraph</li>
                  <li>GraphQL query field mismatch</li>
                  <li>API connection error</li>
                </ul>
                <p className="text-sm mt-2">
                  Check server logs for detailed error messages.
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold mb-2">Next Steps</h2>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>
                <a href="/resources/blog" className="text-blue-600 hover:underline">
                  Visit Blog Page
                </a>
              </li>
              <li>
                <a href="/api/blog-diagnostic" className="text-blue-600 hover:underline">
                  Check Diagnostic Endpoint
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
