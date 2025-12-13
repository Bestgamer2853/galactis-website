import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route for revalidating blog pages when content is updated in Hygraph
 * 
 * This allows instant updates without redeployment when you publish new posts.
 * 
 * Setup in Hygraph:
 * 1. Go to Webhooks in Hygraph Studio
 * 2. Create a new webhook
 * 3. URL: https://your-domain.com/api/revalidate
 * 4. Events: Select "Publish" and "Unpublish" for Post model
 * 5. Add header: x-webhook-secret = your secret (set in .env.local)
 */
export async function POST(request: NextRequest) {
  // Verify webhook secret for security
  const secret = request.headers.get("x-webhook-secret");
  const expectedSecret = process.env.REVALIDATION_SECRET;

  if (!expectedSecret) {
    console.warn("REVALIDATION_SECRET not set. Webhook revalidation disabled.");
    return NextResponse.json(
      { message: "Revalidation secret not configured" },
      { status: 500 }
    );
  }

  if (secret !== expectedSecret) {
    return NextResponse.json(
      { message: "Invalid secret" },
      { status: 401 }
    );
  }

  try {
    // Revalidate blog listing page
    revalidatePath("/resources/blog");
    
    // Revalidate all blog post pages (dynamic routes)
    revalidatePath("/resources/blog/[slug]", "page");

    // Also revalidate sitemap
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      paths: ["/resources/blog", "/resources/blog/[slug]", "/sitemap.xml"],
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 }
    );
  }
}



