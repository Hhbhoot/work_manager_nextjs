"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import SignUpSvg from "../../../public/img/signup.svg";
import Image from "next/image";
import toast from "react-hot-toast";
import { signup } from "@/apis";
import { useRouter } from "next/navigation";
const SignUp = () => {
  const router = useRouter();

  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    about: "",
    age: "",
  });

  const handleInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !details.name ||
      !details.email ||
      !details.password ||
      !details.confirmPassword ||
      !details.gender ||
      !details.age
    ) {
      return toast.error("Please provide all required fields");
    }

    if (details.password !== details.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const toastId = toast.loading("Signing Up...");
    try {
      const { data } = await signup(details);
      if (data?.status !== "success") {
        throw new Error(data?.message);
      }

      toast.success(data?.message, {
        id: toastId,
      });

      setDetails({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        about: "",
        age: "",
      });

      router.push("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message, {
        id: toastId,
      });
    }
  };

  const handleResetClick = () => {
    setDetails({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      about: "",
      age: "",
    });
  };

  useEffect(() => {
    // This effect will run when the component mounts
    const signupSection = document.getElementById("signup-section");
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []); // Empty dependency array to run on component mount

  return (
    <div className="w-full my-10 text-white " id="signup-section">
      <div className="flex items-center justify-around flex-wrap">
        <div className="">
          <Image
            src={SignUpSvg}
            alt="logo"
            className="rounded-xl object-cover"
            width={400}
            height={300}
            sizes="(max-width: 640px) 150px, (max-width: 1024px) 300px, 400px"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-center mt-6 w-[80%] md:w-[45%] gap-y-5"
        >
          <div className="flex flex-col md:flex-row items-center justify-between  gap-5 w-full">
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
                onChange={handleInputChange}
                value={details.name}
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
                onChange={handleInputChange}
                value={details.email}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between  gap-5 w-full">
            <div className="w-full flex flex-col space-y-2 relative">
              <label htmlFor="gender" className="px-1">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="w-full bg-gray-600 rounded-md focus:outline-none px-2 py-2  font-medium  cursor-pointer "
                onChange={handleInputChange}
                value={details.gender}
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
                onChange={handleInputChange}
                value={details.age}
              />
            </div>
          </div>

          <div className="w-full flex flex-col space-y-2">
            <label htmlFor="about" className="px-1">
              About
            </label>
            <textarea
              type="text"
              name="about"
              id="about"
              rows="3"
              placeholder="Enter about your self"
              className="w-full bg-gray-600 rounded-md focus:outline-none px-2 py-1  font-medium "
              onChange={handleInputChange}
              value={details.about}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between  gap-5 w-full">
            <div className="w-full flex flex-col space-y-2">
              <label htmlFor="password" className="px-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                className="w-full bg-gray-600 rounded-md focus:outline-none px-2 py-2  font-medium "
                onChange={handleInputChange}
                value={details.password}
              />
            </div>

            <div className="w-full flex flex-col space-y-2">
              <label htmlFor="confirmPassword" className="px-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter password again"
                className="w-full bg-gray-600 rounded-md focus:outline-none px-2 py-2  font-medium "
                onChange={handleInputChange}
                value={details.confirmPassword}
              />
            </div>
          </div>

          <div className="w-full flex justify-center items-center gap-5 mt-5 ">
            <button
              className="w-full bg-blue-600 rounded-md focus:outline-none px-2 py-3  font-medium"
              type="submit"
            >
              Sign Up
            </button>

            <button
              className="w-full bg-red-600 rounded-md focus:outline-none px-2 py-3  font-medium"
              onClick={handleResetClick}
              type="button"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
