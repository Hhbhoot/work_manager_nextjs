"use client";
import { getUserTasks } from "@/apis";
import { Tasks } from "@/components";
import { useAuthContex } from "@/Contex/AuthContex";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ShowTask = () => {
  const { user } = useAuthContex();
  const userId = user?._id;
  const [tasks, setTasks] = useState([]);
  const fetchUserTasks = async () => {
    try {
      const { data } = await getUserTasks(userId);
      if (data?.status !== "success") throw new Error(data?.message);
      setTasks(data?.tasks);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching users tasks");
    }
  };

  useEffect(() => {
    if (userId) fetchUserTasks();
  }, [userId]);

  return (
    <div className="flex items-center justify-center my-10">
      {tasks?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {" "}
          <div className="flex items-center justify-start">
            <div className="text-xl font-semibold text-white">
              Your Task ({tasks?.length})
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {tasks?.map((task) => (
              <Tasks tasks={task} key={task?._id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-2xl font-semibold">No tasks found</div>
      )}
    </div>
  );
};

export default ShowTask;
