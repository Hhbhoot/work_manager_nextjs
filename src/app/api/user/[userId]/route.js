import { NextResponse } from "next/server";

export const GET = (request, { params }) => {
  console.log(params);

  return NextResponse.json(
    {
      message: "Hello Nextjs",
      status: "success",
    },
    {
      status: 200,
    }
  );
};
