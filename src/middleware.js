import { NextRequest, NextResponse } from "next/server";
import { validate } from "./apis"; // Assume this function exists to verify the token

export const middleware = async (request) => {
  const token = request.cookies.get("AuthToken")?.value;
  const path = request?.nextUrl?.pathname;
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/contact";

  // Allow access to API routes without token verification
  if (path.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Allow access to public paths without a token
  if (isPublicPath && !token) {
    return NextResponse.next();
  }

  // Redirect to login if no token and not a public path
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify token if present
  if (token) {
    try {
      await validate();
      // If token is valid and it's a public path, redirect to home
      if (isPublicPath) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      // If token is valid and it's not a public path, allow access
      return NextResponse.next();
    } catch (error) {
      // If token is invalid, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Default case: allow access
  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/login", "/signup", "/add-task", "/show-task", "/api/:path*"],
};
