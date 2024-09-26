import { NextResponse } from "next/server";
import { config as apiUrl } from "./config/config";
import axios from "axios";
const PUBLIC_PATHS = ["/login", "/signup"];
const SHARED_ACCESS_PATHS = ["/contact"];
const HOME_PATH = "/";

export const middleware = async (request) => {
  const path = request.nextUrl.pathname;
  const token = request?.cookies?.get("token")?.value;
  // console.log("middleware token", token);

  // // Handle public paths
  if (PUBLIC_PATHS.some((publicPath) => path.startsWith(publicPath))) {
    // If authenticated, redirect to home
    if (token) {
      return NextResponse.redirect(new URL(HOME_PATH, request.url));
    }
    return NextResponse.next();
  }

  // // Allow shared access paths for both authenticated and unauthenticated users
  if (SHARED_ACCESS_PATHS.some((sharedPath) => path.startsWith(sharedPath))) {
    return NextResponse.next();
  }

  // // Allow API routes to pass through
  if (path.startsWith("/api")) {
    return NextResponse.next();
  }

  // // Redirect to login if no token is present
  if (!token) {
    console.log("Token not found");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { data } = await axios.get(`${apiUrl.BASE_URL}/api/user/current`, {
      headers: {
        Authorization: token,
      },
    });
    if (data?.status !== "success") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    console.error("Token validation error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/add-task", "/show-task"],
};
