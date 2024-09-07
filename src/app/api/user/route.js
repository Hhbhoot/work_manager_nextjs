import { NextResponse } from "next/server";
import { connectDB } from "@/helpers/db/db";
import User from "@/Model/user/userModel";
import bcypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

export const GET = async (request) => {
  const users = await User.find();
  return NextResponse.json(
    {
      status: "success",
      message: "User fetched successfully",
      data: {
        users,
      },
    },
    {
      status: 200,
    }
  );
};

export const POST = async (request) => {
  console.log(process.env.NODE_ENV);
  const { name, email, password } = await request.json();

  try {
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          statusText: "Bad Request",
          message: "Name, email, and password are required",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          statusText: "Conflict",
          message: "Email already exists",
        },
        {
          status: 409,
        }
      );
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          statusText: "Bad Request",
          message:
            "Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "10d",
      }
    );

    const response = NextResponse.json({
      status: 201,
      statusText: "Created",
      data: newUser,
    });

    response.cookies.set("AuthToken", token, {
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60,
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENVIRONMENT === "production",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        statusText: "Internal Server Error",
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
};
