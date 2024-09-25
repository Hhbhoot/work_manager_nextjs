import { NextResponse } from "next/server";

export async function POST(request) {
  const response = NextResponse.json(
    {
      status: "success",
      message: "User logged out successfully",
    },
    {
      status: 200,
    }
  );

  response.cookies.set("token", "", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });

  return response;
}
