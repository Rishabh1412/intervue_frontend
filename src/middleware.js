// middleware.js (in root of your project)

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Only run middleware on these routes
export const config = {
  matcher: ['/interview/:path*)', '/interview-user-data/:path*', '/profile/:path*']
};
