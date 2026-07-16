import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_ROUTES = ["/p-access/dashboard", "/p-access/content", "/p-access/settings", "/p-access/users"];
const AUTH_ROUTES = ["/p-access/login"];

const BLOCKED_AGENTS = [
  'python-requests', 'python-urllib', 'scrapy', 'curl/', 'wget/', 'libwww-perl',
  'go-http-client', 'node-fetch', 'axios/'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') ?? '';
  const ua = userAgent.toLowerCase();

  // 1. Scraper Blocking (Strict for production)
  if (BLOCKED_AGENTS.some(agent => ua.includes(agent.toLowerCase()))) {
    return new NextResponse(
      JSON.stringify({ error: 'Access Denied', message: 'Tanzania Reach — Security Shield Active' }), 
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 2. Admin Route Protection
  const sessionCookie = request.cookies.get("firebase-session");
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  if (isAdminRoute && !sessionCookie?.value) {
    const loginUrl = new URL("/p-access/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && sessionCookie?.value) {
    return NextResponse.redirect(new URL("/p-access/dashboard", request.url));
  }

  const response = NextResponse.next();
  
  // Security Headers
  response.headers.set('X-Protected-By', 'Tanzania Reach');
  response.headers.set('X-Robots-Tag', 'index, follow');
  response.headers.set('Permissions-Policy', 'browsing-topics=()');
  
  if (pathname.startsWith('/p-access')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    response.headers.set('X-Frame-Options', 'DENY');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml, site.webmanifest (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|og-image.png|favicon-).*)',
  ],
};