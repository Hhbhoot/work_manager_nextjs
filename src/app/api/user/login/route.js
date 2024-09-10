import User from "@/Model/user/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/helpers/db/db";

connectDB();
export const POST = async (request) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      {
        status: "error",
        message: "Email and password are required",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid password",
        },
        {
          status: 401,
        }
      );
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10d",
    });

    const response = NextResponse.json(
      {
        status: "success",
        message: "User logged in successfully",
      },
      {
        status: 200,
      }
    );

    response.cookies.set("AuthToken", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 10 * 24 * 60 * 60,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
