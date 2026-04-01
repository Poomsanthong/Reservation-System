import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Extract tenant slug from the URL path. This is used to determine which tenant's data to fetch and display.
function extractTenantSlug(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] === "bookingPage" && segments[1]) {
    return segments[1];
  }

  if (segments[0] === "admin" && segments[1]) {
    return segments[1];
  }

  return null;
}

// Middleware function that runs on every request to handle tenant slug extraction and authentication checks.
export async function proxy(req: NextRequest) {
  // 1 Extract tenant slug from the request URL or referer header if not present in the URL.
  const { pathname } = req.nextUrl;
  let tenantSlug = extractTenantSlug(pathname);

  if (!tenantSlug) {
    const referer = req.headers.get("referer");
    if (referer) {
      try {
        tenantSlug = extractTenantSlug(new URL(referer).pathname);
      } catch {
        // Ignore malformed referer headers
      }
    }
  }
  // Forward the tenant slug to downstream handlers while preserving
  // any auth cookie updates written by Supabase onto the same response.
  // 2 Create a new Headers object based on the incoming request headers and add the tenant slug if it exists.
  const requestHeaders = new Headers(req.headers);
  if (tenantSlug) {
    requestHeaders.set("x-tenant-slug", tenantSlug);
  }

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 3 Create a Supabase client instance that can read and write cookies from the request and response objects.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => req.cookies.get(key)?.value,
        set: (key, value, options) => {
          res.cookies.set(key, value, options);
        },
        remove: (key, options) => {
          res.cookies.set(key, "", options);
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //  4 Protect admin
  if (pathname.startsWith("/admin") && !user) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  //   5 Prevent logged-in users from login page
  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Run on app routes, but skip Next internals and direct file requests
     * such as favicon.svg so they never get mistaken for tenant slugs.
     */
    "/((?!_next|.*\\..*).*)",
  ],
};
