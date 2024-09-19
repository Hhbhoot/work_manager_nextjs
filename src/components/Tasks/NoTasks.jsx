import Image from "next/image";
import Link from "next/link";
import React from "react";

const NoTasks = () => {
  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-lg text-center mx-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">No Tasks Found</h2>
      <p className="text-gray-600 mb-6">
        You haven’t added any tasks yet. Start organizing your work by creating
        your first task!
      </p>
      <Link href={"/add-task"}>
        <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
          Add Task
        </button>
      </Link>
      <div className="mt-6 w-full">
        <Image
          width={100}
          height={100}
          src={"/img/addtask.webp"}
          alt="No tasks illustration"
          className="w-full max-w-[240px] mx-auto"
        />
      </div>
    </div>
  );
};

export default NoTasks;
