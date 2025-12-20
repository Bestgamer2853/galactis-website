import { NextRequest, NextResponse } from 'next/server';

/**
 * Logo Proxy API Route
 * Proxies logo requests to avoid CORS issues and provide fallbacks
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const domain = searchParams.get('domain');
  const size = searchParams.get('size') || '256';

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter required' }, { status: 400 });
  }

  // Try multiple logo sources
  const logoUrls = [
    `https://logo.clearbit.com/${domain}?size=${size}`,
    `https://logo.clearbit.com/${domain}`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`,
  ];

  // Try to fetch from first URL
  try {
    const response = await fetch(logoUrls[0], {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Galactis/1.0)',
      },
    });

    if (response.ok) {
      const imageBuffer = await response.arrayBuffer();
      return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': response.headers.get('Content-Type') || 'image/png',
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        },
      });
    }
  } catch (error) {
    console.error('Logo fetch error:', error);
  }

  // If first fails, return 404 - component will handle fallback
  return NextResponse.json({ error: 'Logo not found' }, { status: 404 });
}


