import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request) => {
  const token = request.cookies.get("AuthToken")?.value;
  const path = request?.nextUrl?.pathname;
  const isPublicPaths = path === "/login" || path === "/signup";

  if (
    path === "/api/user/login" ||
    path === "/api/user" ||
    path === "/api/mail"
  ) {
    return NextResponse.next();
  }
  if (!token && !isPublicPaths) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token && isPublicPaths) {
    return NextResponse.redirect(new URL("/", request.url));
  }
};

export const config = {
  matcher: ["/", "/login", "/signup", "/add-task", "/show-task", "/api/:path*"],
};
