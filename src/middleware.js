// src/middleware.js

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
  console.log('Middleware triggered for:', request.nextUrl.pathname);

  const token = request.cookies.get('token')?.value;
  console.log('Token:', token);

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Match only specific routes
export const config = {
  matcher: ['/interview/:path*', '/interview-user-data/:path*', '/profile/:path*', '/user-dashboard/:path*'],
};
