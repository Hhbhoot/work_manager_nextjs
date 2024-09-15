import User from "@/Model/user/userModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/helpers/db/db";

connectDB();

export const GET = async (request) => {
  const token = request?.cookies?.get("AuthToken")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.json({
      status: "success",
      message: "User fetched successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    const response = NextResponse.json(
      {
        status: "fail",
        message: "UnAuthorized",
        data: null,
      },
      {
        status: 400,
      }
    );

    response.cookies.set("AuthToken", "", {
      expires: new Date(0),
    });

    return response;
  }
};
