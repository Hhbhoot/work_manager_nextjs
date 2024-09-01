import Task from "@/Model/Task/taskModel";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { taskId } = params;

  const task = await Task.findById(taskId);

  if (!task) {
    return NextResponse.json(
      { status: "error", message: "Task not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ status: "success", data: task }, { status: 200 });
};

export const DELETE = async (request, { params }) => {
  const { taskId } = params;
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    return NextResponse.json(
      { status: "error", message: "Task not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { status: "success", message: "Task deleted" },
    { status: 200 }
  );
};

export const PATCH = async (request, { params }) => {
  const { taskId } = params;
  const data = await request.json();
  const updatedTask = await Task.findByIdAndUpdate(taskId, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) {
    return NextResponse.json(
      { status: "error", message: "Task not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { status: "success", data: updatedTask },
    { status: 200 }
  );
};
