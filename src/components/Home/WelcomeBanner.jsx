import React from "react";
import Image from "next/image";
import welcomeSvg from "../../../public/img/welcome.svg";
import Link from "next/link";
const WelcomeBanner = () => {
  return (
    <div className="bg-black text-white p-6 shadow-md flex items-center flex-wrap-reverse gap-y-8  justify-around mt-5">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Welcome to Task Manager
        </h1>
        <p className="text-lg text-center">
          Manage your tasks efficiently and stay productive!
        </p>
        <Link href="/add-task">
          <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200">
            Get Started
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <Image
          src={welcomeSvg}
          height={400}
          width={400}
          alt="Task Management"
        />
      </div>
    </div>
  );
};

export default WelcomeBanner;
