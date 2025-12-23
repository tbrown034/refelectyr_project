import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;

  console.log(`[Proxy] Path: ${pathname}, Has session cookie: ${!!sessionCookie}`);

  // Profile page handles both authenticated and unauthenticated states
  // so we don't block access - it shows sign-in UI when not authenticated
  if (pathname.startsWith("/profile")) {
    console.log("[Proxy] Allowing access to profile page");
    return NextResponse.next();
  }

  // For other protected routes (add more here as needed)
  // Example: /dashboard, /settings, etc.
  // if (!sessionCookie) {
  //   console.log("[Proxy] No session, redirecting to /profile for sign-in");
  //   return NextResponse.redirect(new URL("/profile", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  // Add routes that need proxy processing
  // Profile is included for logging but not blocked
  matcher: ["/profile/:path*"],
};
