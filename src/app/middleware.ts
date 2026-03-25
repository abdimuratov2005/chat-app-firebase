import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PATHS, USER_UUID } from "@/shared/api/api";

export function middleware(request: NextRequest) {
  const userId = request.cookies.get(USER_UUID)?.value;

  const isAuthPage = request.nextUrl.pathname === PATHS[1];

  if (!userId && !isAuthPage) {
    return NextResponse.redirect(new URL(PATHS[1], request.url));
  }

  if (userId && isAuthPage) {
    return NextResponse.redirect(new URL(PATHS[0], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...PATHS],
};