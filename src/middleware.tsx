import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Assuming you have a mechanism to determine authentication state
  const isAuthenticated = false; // Replace with your actual authentication check

  console.log(`Request received: ${req.url}`);

  // Redirect unauthenticated requests to the root page to the login page
  if (!isAuthenticated && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Continue processing the request
  return NextResponse.next();
}

// Apply middleware to all requests within the root directory
export const config = {
  matcher: ['/'],
};
