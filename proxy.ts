import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // detect any supabase auth cookie
  const hasSupabaseCookie = Array.from(req.cookies.getAll()).some((c) =>
    c.name.includes("auth-token")
  );

  // PROTECT ADMIN ROUTE
  if (pathname.startsWith("/admin")) {
    if (!hasSupabaseCookie) {
      const url = new URL("/login", req.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  // PREVENT LOGGED-IN USER FROM SEEING LOGIN PAGE
  if (pathname === "/login" && hasSupabaseCookie) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
