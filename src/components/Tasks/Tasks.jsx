"use client";
import { useAuthContex } from "@/Contex/AuthContex";
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Tasks = ({ tasks, handleDelete }) => {
  const { user } = useAuthContex();
  return (
    <div
      className={`flex items-center justify-start ${
        tasks.status === "Completed" ? "bg-green-800" : "bg-gray-800"
      } p-6 rounded-lg shadow-lg lg:min-w-[650px]  max-w-[650px]`}
    >
      <div className="flex flex-col gap-4 items-start  text-white w-full relative">
        <IoIosCloseCircleOutline
          className="absolute top-0 text-xl right-0 text-red-500 hover:text-gray-300 cursor-pointer"
          onClick={() => handleDelete(tasks)}
        />
        <div className="text-2xl font-bold border-b border-gray-500 pb-2">
          {tasks?.title || "No Title"}
        </div>
        <div className="text-sm text-gray-300">
          <span className="font-semibold text-gray-400">Description: </span>
          {tasks?.description || "No description available"}
        </div>
        <div className="text-sm text-gray-300">
          <span className="font-semibold text-gray-400">Status: </span>
          {tasks?.status || "No status available"}
        </div>
        <div className="text-sm text-gray-300">
          <span className="font-semibold text-gray-400">Due Date: </span>
          {tasks?.dueDate
            ? new Date(tasks.dueDate).toLocaleDateString()
            : "No due date"}
        </div>
        <div className="text-sm text-gray-300 self-end">
          <span className="font-semibold text-gray-400">Author: </span>
          {user?.name || "Unknown"}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
