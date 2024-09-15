import React from "react";
import Image from "next/image";
import welcomeSvg from "../../../public/img/welcome.svg";
const WelcomeBanner = () => {
  return (
    <div className="bg-blue-500 text-white p-6 shadow-md flex items-center justify-around my-5">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to Task Manager</h1>
        <p className="text-lg">
          Manage your tasks efficiently and stay productive!
        </p>
        <button className="mt-4 px-6 py-2 bg-white text-blue-500 font-semibold rounded-lg hover:bg-gray-200">
          Get Started
        </button>
      </div>
      <div className="flex justify-center items-center">
        <Image
          src={welcomeSvg}
          alt="Task Management"
          className=" h-auto rounded-l  w-2/5"
        />
      </div>
    </div>
  );
};

export default WelcomeBanner;
