import { connectDB } from "@/helpers/db/db";
import Task from "@/Model/Task/taskModel";
import User from "@/Model/user/userModel";
import { NextResponse } from "next/server";

connectDB();

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      {
        statusText: "Bad Request",
        message: "User ID is required",
      },
      { status: 400 }
    );
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }

    const tasks = await Task.find({ userId: userId });
    return NextResponse.json(
      { status: "success", message: "Tasks fetched successfully", tasks },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  const { userId, title, description, dueDate, status } = await request.json();

  if (!userId || !title || !description || !status) {
    return NextResponse.json(
      {
        statusText: "Bad Request",
        message: "User ID, title, description and status are required",
      },
      { status: 400 }
    );
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }

    const newTask = await Task.create({
      userId,
      title,
      description,
      dueDate,
      status,
    });

    return NextResponse.json(
      { status: "success", message: "Task created", task: newTask },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
};
