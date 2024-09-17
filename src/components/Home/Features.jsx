"use client";
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid"; // Updated for Heroicons v2

const features = [
  {
    title: "Task Creation",
    description:
      "Easily create and manage your tasks with a user-friendly interface.",
    icon: <CheckCircleIcon className="h-6 w-6 text-blue-500" />, // Optional icon
  },
  {
    title: "Deadlines & Reminders",
    description:
      "Set deadlines and receive reminders to stay on top of your tasks.",
    icon: <CheckCircleIcon className="h-6 w-6 text-blue-500" />,
  },
  //   {
  //     title: "Collaboration",
  //     description:
  //       "Collaborate with your team, assign tasks, and track progress.",
  //     icon: <CheckCircleIcon className="h-6 w-6 text-blue-500" />,
  //   },
];

const Features = () => {
  return (
    <div className="bg-blue-400 p-8 mt-5 shadow-md">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg flex items-start"
          >
            <div className="mr-4">
              {feature.icon} {/* Displaying icon */}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
