export { auth as middleware } from "@/auth";

// Only run middleware on protected routes
// This prevents unnecessary auth checks on static assets and public pages
export const config = {
  matcher: [
    "/profile/:path*",
  ],
};
