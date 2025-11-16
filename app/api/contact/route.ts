import { NextRequest, NextResponse } from "next/server";
import { submitToHubSpot } from "@/lib/hubspot";

// Rate limiting: Store in memory (in production, use Redis or similar)
const submissionCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // 10 submissions per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function getClientIP(req: NextRequest): string {
  // Try various headers for client IP
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  // Next.js 16 doesn't have req.ip, so return unknown if headers are missing
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = submissionCounts.get(ip);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    submissionCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false; // Rate limit exceeded
  }

  // Increment count
  record.count++;
  submissionCounts.set(ip, record);
  return true;
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of submissionCounts.entries()) {
    if (now > record.resetTime) {
      submissionCounts.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.company || !body.message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Rate limiting
    const clientIP = getClientIP(req);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Submit to HubSpot
    try {
      const result = await submitToHubSpot({
        name: body.name,
        email: body.email,
        company: body.company,
        phone: body.phone || "",
        message: body.message,
        source: body.source || "website",
        timestamp: new Date().toISOString(),
      });

      if (!result.ok) {
        console.error("HubSpot submission failed:", result.error);
        // Still return success to user, but log error
        // In production, you might want to queue for retry
      }

      return NextResponse.json(
        { ok: true, message: "Thank you! We'll contact you soon." },
        { status: 200 }
      );
    } catch (hubspotError) {
      console.error("HubSpot API error:", hubspotError);
      // Return success to user even if HubSpot fails
      // Log error for monitoring
      return NextResponse.json(
        { ok: true, message: "Thank you! We'll contact you soon." },
        { status: 200 }
      );
    }
  } catch (e) {
    console.error("Contact form error:", e);
    return NextResponse.json(
      { ok: false, error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}

