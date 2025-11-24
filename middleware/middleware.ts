// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const { nextUrl, cookies } = req;
//   const pathname = nextUrl.pathname;

//   // Only act on /admin routes
//   if (!pathname.startsWith("/admin")) {
//     return NextResponse.next();
//   }

//   // Read Supabase access token cookies (auth helpers)
//   const accessToken =
//     cookies.get("sb-access-token")?.value ||
//     cookies.get("supabase-access-token")?.value ||
//     "";

//   // If user hits login page and is already authenticated, send to /admin
//   if (pathname === "/admin/login") {
//     if (accessToken) {
//       const url = new URL("/admin", req.url);
//       return NextResponse.redirect(url);
//     }
//     return NextResponse.next();
//   }

//   // For all other /admin routes, require auth
//   if (!accessToken) {
//     const url = new URL("/admin/login", req.url);
//     url.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };
