import { NextResponse } from "next/server";
import { connectDB } from "@/helpers/db/db";
import User from "@/Model/user/userModel";
import bcypt from "bcrypt";

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
  const { name, email, password } = await request.json();

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

  return NextResponse.json({
    status: 201,
    statusText: "Created",
    data: newUser,
  });
};
