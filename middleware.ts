import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request URL to preserve original
  const url = request.nextUrl.clone();
  
  // Capture UTM parameters
  const utmSource = request.nextUrl.searchParams.get('utm_source');
  const utmMedium = request.nextUrl.searchParams.get('utm_medium');
  const utmCampaign = request.nextUrl.searchParams.get('utm_campaign');
  const utmTerm = request.nextUrl.searchParams.get('utm_term');
  const utmContent = request.nextUrl.searchParams.get('utm_content');

  // If UTM parameters are present, store them in session or cookies
  if (utmSource || utmMedium || utmCampaign || utmTerm || utmContent) {
    // Create a response object
    const response = NextResponse.next();
    
    // Store UTM parameters in cookies (optional)
    if (utmSource) response.cookies.set('utm_source', utmSource, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    if (utmMedium) response.cookies.set('utm_medium', utmMedium, { maxAge: 60 * 60 * 24 * 30 });
    if (utmCampaign) response.cookies.set('utm_campaign', utmCampaign, { maxAge: 60 * 60 * 24 * 30 });
    if (utmTerm) response.cookies.set('utm_term', utmTerm, { maxAge: 60 * 60 * 24 * 30 });
    if (utmContent) response.cookies.set('utm_content', utmContent, { maxAge: 60 * 60 * 24 * 30 });
    
    return response;
  }

  // Handle redirects if needed
  // Example: redirect from old URLs to new ones
  if (url.pathname === '/old-poll-page') {
    return NextResponse.redirect(new URL('/poll', request.url));
  }

  // Block suspicious requests
  const userAgent = request.headers.get('user-agent');
  if (userAgent && userAgent.includes('bot') && !userAgent.includes('Googlebot') && !userAgent.includes('bingbot')) {
    // Return a 403 for known bad bots
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Continue with normal request
  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.json (PWA manifest file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)',
  ],
};