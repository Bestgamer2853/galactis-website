import { hygraphClient } from "@/lib/hygraph";
import { NextResponse } from "next/server";

/**
 * Diagnostic endpoint to test Hygraph connection and schema
 * Visit: /api/blog-diagnostic
 */
export async function GET() {
  const diagnostic: {
    hygraphConfigured: boolean;
    tokenConfigured?: boolean;
    endpoint?: string;
    testResults: {
      basicQuery?: any;
      error?: string;
      postsCount?: number;
      samplePost?: any;
    };
    recommendations: string[];
  } = {
    hygraphConfigured: !!hygraphClient,
    tokenConfigured: false,
    testResults: {},
    recommendations: [],
  };

  if (!hygraphClient) {
    diagnostic.recommendations.push(
      "Set HYGRAPH_ENDPOINT environment variable in .env.local"
    );
    if (!process.env.HYGRAPH_TOKEN) {
      diagnostic.recommendations.push(
        "Optional: Set HYGRAPH_TOKEN for authenticated access (useful for draft content)"
      );
    }
    return NextResponse.json(diagnostic, { status: 200 });
  }
  
  if (!process.env.HYGRAPH_TOKEN) {
    diagnostic.recommendations.push(
      "💡 Tip: Add HYGRAPH_TOKEN for authenticated access (allows draft content access)"
    );
  }

  // Get endpoint URL (from environment)
  diagnostic.endpoint = process.env.HYGRAPH_ENDPOINT || "Not set";
  diagnostic.tokenConfigured = !!process.env.HYGRAPH_TOKEN;

  try {
    // Test 1: Try basic query with publishedDate
    try {
      const query1 = `
        query TestQuery {
          posts(stage: PUBLISHED, first: 1) {
            id
            title
            slug
            excerpt
            publishedDate
          }
        }
      `;
      const result1 = await hygraphClient.request(query1);
      diagnostic.testResults.basicQuery = "✅ Success with publishedDate";
      diagnostic.testResults.postsCount = result1.posts?.length || 0;
      diagnostic.testResults.samplePost = result1.posts?.[0] || null;
    } catch (error1: any) {
      // Test 2: Try with publishedAt instead
      try {
        const query2 = `
          query TestQuery {
            posts(stage: PUBLISHED, first: 1) {
              id
              title
              slug
              excerpt
              publishedAt
            }
          }
        `;
        const result2 = await hygraphClient.request(query2);
        diagnostic.testResults.basicQuery = "✅ Success with publishedAt (schema uses publishedAt, not publishedDate)";
        diagnostic.testResults.postsCount = result2.posts?.length || 0;
        diagnostic.testResults.samplePost = result2.posts?.[0] || null;
        diagnostic.recommendations.push(
          "⚠️ Your schema uses 'publishedAt' but queries use 'publishedDate'. Update queries in lib/hygraph.ts"
        );
      } catch (error2: any) {
        diagnostic.testResults.error = error2.message || "Unknown error";
        diagnostic.recommendations.push(
          "Check GraphQL query fields match your Hygraph Post model schema"
        );
      }
    }

    // Additional recommendations
    if (diagnostic.testResults.postsCount === 0) {
      diagnostic.recommendations.push(
        "No published posts found. Publish posts in Hygraph Studio"
      );
    }

    if (!diagnostic.testResults.error && diagnostic.testResults.postsCount === 0) {
      diagnostic.recommendations.push(
        "Posts exist but none are published. Check 'Stages' column in Hygraph Studio"
      );
    }
  } catch (error: any) {
    diagnostic.testResults.error = error.message || "Unknown error";
    diagnostic.recommendations.push("Check network connectivity and endpoint URL");
  }

  return NextResponse.json(diagnostic, { status: 200 });
}
