"use client";
import React from "react";
import SignUpSvg from "../../../public/img/signup.svg";
import Image from "next/image";
import { IoIosArrowDropdown } from "react-icons/io";

const Step2 = ({ formData, setFormData, nextStep, previousStep }) => {
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
        <div className="flex flex-col items-center justify-between  gap-5 w-[90%] md:w-[35%]">
          <div className="w-full flex flex-col space-y-2 relative">
            <label htmlFor="gender" className="px-1">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="w-full bg-gray-600 rounded-md focus:outline-none px-2 py-2  font-medium  cursor-pointer "
              value={formData?.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <span className="absolute right-2 top-[60%] pointer-events-none  -translate-y-1/2">
              <IoIosArrowDropdown className="text-white" />
            </span>
          </div>

          <div className="w-full flex flex-col space-y-2">
            <label htmlFor="age" className="px-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Enter age here"
              className="w-full bg-gray-600 rounded-md focus:outline-none px-2 py-2  font-medium "
              value={formData?.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-normal gap-5">
            <button
              className="py-2 px-5 rounded-md bg-blue-600"
              onClick={previousStep}
              type="button"
            >
              Previous
            </button>
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

export default Step2;
