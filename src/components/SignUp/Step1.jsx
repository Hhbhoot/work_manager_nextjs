"use client";
import React from "react";
import SignUpSvg from "../../../public/img/signup.svg";
import Image from "next/image";

const Step1 = ({ formData, nextStep, setFormData }) => {
  return (
    <div className="w-full my-10 text-white " id="signup-section">
      <div className="flex items-center justify-around flex-col md:flex-row gap-y-8">
        <div className="">
          <Image
            src={SignUpSvg}
            alt="logo"
            className="rounded-xl object-cover"
            width={400}
            height={300}
            // sizes="(max-width: 640px) 150px, (max-width: 1024px) 300px, 400px"
          />
        </div>
        <div className="flex flex-col  items-center justify-between  gap-5 w-[90%] md:w-[35%]">
          <div className="w-full flex flex-col space-y-2">
            <label htmlFor="name" className="px-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name Here"
              className="w-full bg-gray-600 rounded-md focus:outline-none px-2 py-2  font-medium "
              value={formData?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="w-full flex flex-col space-y-2">
            <label htmlFor="email" className="px-1 ">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email Here"
              className="w-full bg-gray-600 rounded-md focus:outline-none px-2 py-2  font-medium"
              value={formData?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <button
              className="py-2 px-5 rounded-md bg-blue-600"
              onClick={nextStep}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
