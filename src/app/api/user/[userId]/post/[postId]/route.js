import { NextResponse } from "next/server";

export const GET = (request, { params }) => {
  console.log(params);
  console.log(request.nextUrl.pathname);

  return NextResponse.json(
    {
      status: "success",
      message: "Hello",
    },
    {
      status: 200,
    }
  );
};
