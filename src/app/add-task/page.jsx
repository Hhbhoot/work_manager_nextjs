"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import loginsvg from "../../../public/img/login.svg";
import toast from "react-hot-toast";
import { addTask } from "@/apis";
const metadata = {
  title: "Work Manager | Add Task",
};

const AddTask = () => {
  document.title = metadata.title;

  const [details, setDetails] = useState({
    task_title: "",
    task_description: "",
    task_dueDate: "",
    task_status: "",
  });

  const handleInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Adding Task...");
    try {
      const docs = {
        title: details.task_title,
        description: details.task_description,
        dueDate: details.task_dueDate,
        status: details.task_status,
        userId: "66cdf72afbc092c0d099dd87",
      };

      const { data } = await addTask(docs);
      if (data?.status !== "success") {
        throw new Error(data?.message);
      }
      toast.success("Task Added Successfully", {
        id: toastId,
      });
      setDetails({
        task_title: "",
        task_description: "",
        task_dueDate: "",
        task_status: "",
      });
    } catch (error) {
      toast.error(error?.data?.response?.message || error.message, {
        id: toastId,
      });
    }
  };

  const handleCancelClick = () => {
    setDetails({
      task_title: "",
      task_description: "",
      task_dueDate: "",
      task_status: "",
    });
  };

  return (
    <div className="w-full my-10 text-white ">
      <div className="flex items-center justify-center">
        <Image src={loginsvg} alt="logo" width={200} height={200} />
      </div>
      <div className="text-center mt-2">
        <h1 className="text-xl">Add Your Task Here</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center mx-auto mt-4 w-[35%] space-y-5"
      >
        <div className="w-full flex flex-col space-y-2">
          <label htmlFor="task_title" className="px-1">
            Title
          </label>
          <input
            type="text"
            name="task_title"
            id="task_title"
            placeholder="Enter your task title"
            className="w-full bg-gray-600 rounded-md focus:outline-none px-2 py-1  font-medium "
            onChange={handleInputChange}
            value={details.task_title}
          />
        </div>

        <div className="w-full flex flex-col space-y-2">
          <label htmlFor="task_description" className="px-1 ">
            Description
          </label>
          <textarea
            name="task_description"
            id="task_description"
            rows="5"
            placeholder="Enter your task description"
            className="w-full bg-gray-600 rounded-md focus:outline-none px-2 py-1  font-medium"
            onChange={handleInputChange}
            value={details.task_description}
          />
        </div>

        <div className="w-full flex flex-col space-y-2 relative">
          <label htmlFor="task_status" className="px-1">
            Status
          </label>
          <select
            name="task_status"
            id="task_status"
            className="w-full bg-gray-600 rounded-md focus:outline-none px-2 py-1  font-medium  cursor-pointer "
            onChange={handleInputChange}
            value={details.task_status}
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <span className="absolute right-2 top-[60%] pointer-events-none  -translate-y-1/2">
            <IoIosArrowDropdown className="text-white" />
          </span>
        </div>

        <div className="w-full flex flex-col space-y-2">
          <label htmlFor="task_due_date" className="px-1">
            Due Date
          </label>
          <input
            type="date"
            name="task_dueDate"
            id="task_dueDate"
            className="w-full bg-gray-600 rounded-md focus:outline-none px-2 py-1  font-medium "
            onChange={handleInputChange}
            value={details.task_dueDate}
          />
        </div>

        <div className="w-full flex justify-center items-center gap-5  ">
          <button
            className="w-full bg-blue-600 rounded-md focus:outline-none px-2 py-2  font-medium"
            type="submit"
          >
            Add Task
          </button>

          <button
            className="w-full bg-red-600 rounded-md focus:outline-none px-2 py-2  font-medium"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
