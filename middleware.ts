import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that should always be public, regardless of auth state
const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/projects(.*)',
  '/contact',
  '/blog',
  '/blog/(.*)',
  '/api/webhooks(.*)', // Important: allow stripe webhooks unauthenticated
  '/api/spotify(.*)'
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|glb|gltf|JPE?G|WEBP|PNG|GIF|SVG|TTF|WOFF2?|ICO|CSV|DOCX?|XLSX?|ZIP|WEBMMANIFEST|GLB|GLTF)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
