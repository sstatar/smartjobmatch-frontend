import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    // 1. ถ้าผู้ใช้พยายามเข้าหน้า Dashboard หรือหน้าที่ต้องใช้ Auth แต่ไม่มี Token
    // (สมมติว่า URL ของคุณขึ้นต้นด้วย /dashboard, /saved)
    const protectedPaths = ["/dashboard", "/saved", "/applied"];
    const isProtectedPath = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path),
    );

    if (isProtectedPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 2. (ทางเลือก) ถ้าล็อกอินแล้ว พยายามเข้าหน้า /login ให้ดีดไป /dashboard
    if (request.nextUrl.pathname.startsWith("/login") && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    // กำหนดให้ Middleware ทำงานเฉพาะเส้นทางที่จำเป็น เพื่อประหยัดทรัพยากร
    matcher: [
        "/dashboard/:path*",
        "/saved/:path*",
        "/applied/:path*",
        "/login",
    ],
};
