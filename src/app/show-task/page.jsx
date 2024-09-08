"use client";
import React from "react";

const metadata = {
  title: "Work Manager | Show Task",
};

const ShowTask = () => {
  document.title = metadata.title;

  return <div className="text-white "> Show Task</div>;
};

export default ShowTask;
