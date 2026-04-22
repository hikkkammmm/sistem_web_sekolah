import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow login page untuk diakses tanpa auth
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }

  // Untuk route /admin lainnya, protection akan ditangani client-side oleh ProtectedRoute component
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
