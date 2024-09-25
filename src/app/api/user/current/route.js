import User from "@/Model/user/userModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/helpers/db/db";

connectDB();

export const GET = async (request) => {
  const token = request?.headers?.get("Authorization");
  // const cookieToken = request?.cookies?.get("token")?.value;
  // console.log("token", token);
  // console.log("cookieToken", cookieToken);
  // const token = request?.cookies?.get("AuthToken")?.value;
  if (!token) {
    console.log("token not found");
    return NextResponse.json(
      {
        status: "fail",
        message: "UnAuthorized",
        data: null,
      },
      {
        status: 400,
      }
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log("user not found");
      return NextResponse.json(
        {
          status: "fail",
          message: "UnAuthorized",
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    // console.log(user);
    return NextResponse.json(
      {
        status: "success",
        message: "User fetched successfully",
        data: {
          user,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
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

    // response.cookies.set("AuthToken", "", {
    //   expires: new Date(0),
    //   path: "/",
    //   httpOnly: true,
    //   sameSite: "strict",
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 0,
    //   domain: "https://work-manager-by-hhb.vercel.app",
    // });

    return response;
  }
};
