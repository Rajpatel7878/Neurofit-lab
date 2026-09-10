import { type NextRequest, NextResponse } from 'next/server';

/**
 * NeuroFit Labs — Middleware
 *
 * 🚧 DEMO MODE: The dashboard is publicly accessible so reviewers can explore it without an account.
 *
 * In production with Supabase enabled:
 * 1. Install @supabase/ssr: `npm install @supabase/ssr`
 * 2. Replace the cookie check below with:
 *    const supabase = createServerClient(url, key, { cookies: ... })
 *    const { data: { session } } = await supabase.auth.getSession()
 *    if (!session) return NextResponse.redirect(new URL('/auth/login', request.url))
 */

const PROTECTED_ROUTES = ['/dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected) {
    // Production auth check (uncomment when Supabase is configured):
    // const session = request.cookies.get(`sb-${process.env.SUPABASE_PROJECT_REF}-auth-token`);
    // if (!session) {
    //   return NextResponse.redirect(new URL('/auth/login', request.url));
    // }

    // Demo mode: allow open access so portfolio reviewers can explore the dashboard
    console.log(`[NeuroFit] Demo mode: open access to ${pathname}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)',
  ],
};
