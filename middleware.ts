// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("auth_token")?.value;
    const isAuthPage = request.nextUrl.pathname.startsWith("/login");
    const isDashboardPage =
        request.nextUrl.pathname === "/" ||
        request.nextUrl.pathname.startsWith("/products");

    if (!token && isDashboardPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/products", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/products/:path*"],
};