import { USER_UUID } from "@/shared/api/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PAGES = ["/auth"];
const CHAT_PAGE = "/chat";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(USER_UUID);

  if (AUTH_PAGES.includes(pathname) && token) {
    return NextResponse.redirect(new URL(CHAT_PAGE, request.url));
  }

  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL(CHAT_PAGE, request.url));
  }

  if (pathname === CHAT_PAGE && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};