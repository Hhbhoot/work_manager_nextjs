import { NextResponse } from "next/server";
import { connectDB } from "@/helpers/db/db";
import User from "@/Model/user/userModel";
connectDB();

export const GET = async (request, { params }) => {
  console.log(params);

  const { userId } = params;

  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json(
      { status: "error", message: "User not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ status: "success", user }, { status: 200 });
};

export const PATCH = async (request, { params }) => {
  console.log(params);
  const { userId } = params;

  const body = await request.json();

  const user = await User.findByIdAndUpdate(userId, body, { new: true });
  if (!user) {
    return NextResponse.json(
      { status: "error", message: "User not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ status: "success", user }, { status: 200 });
};

export const DELETE = async (request, { params }) => {
  console.log(params);
  const { userId } = params;
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    return NextResponse.json(
      { status: "error", message: "User not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { status: "success", message: "User deleted" },
    { status: 200 }
  );
};
