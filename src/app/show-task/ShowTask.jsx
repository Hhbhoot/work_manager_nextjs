"use client";
import { deleteTask, getUserTasks } from "@/apis";
import { NoTasks, Tasks } from "@/components";
import { useAuthContex } from "@/Contex/AuthContex";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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

  const handleDelete = async (taskId) => {
    try {
      const { data } = await deleteTask(taskId);
      if (data?.status !== "success") throw new Error(data?.message);

      const filterTasks = (tasks) => {
        return tasks.filter((task) => task._id != taskId);
      };
      setTasks(filterTasks);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting task");
    }
  };

  const deleteUserTask = (task) => {
    // Show the confirmation box using SweetAlert
    Swal.fire({
      title: "Are you sure you want to delete this task?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(task._id);
        Swal.fire({
          title: "Deleted!",
          text: `Your Task "${task.title}" has been deleted.`,
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center my-10 mx-4">
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
              <Tasks
                tasks={task}
                key={task?._id}
                handleDelete={deleteUserTask}
              />
            ))}
          </div>
        </div>
      ) : (
        <NoTasks />
      )}
    </div>
  );
};

export default ShowTask;
