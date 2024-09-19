import { NextResponse } from "next/server";

export const GET = (request) => {
  const response = NextResponse.json(
    {
      status: "success",
      message: "User logged out successfully",
    },
    {
      status: 200,
    }
  );

  response.cookies.set("AuthToken", "", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // Set the expiration date to the past to remove it
    secure: process.env.NODE_ENV === "production",
  });
  return response;
};
