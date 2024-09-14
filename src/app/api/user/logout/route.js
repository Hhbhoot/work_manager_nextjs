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

  response.cookies?.set("AuthToken", "", {
    expires: new Date(0),
  });

  return response;
};
