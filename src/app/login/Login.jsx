"use client";
import { userLogin } from "@/apis";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import userLoginSvg from "../../../public/img/userLogin.svg";
import { useAuthContex } from "@/Contex/AuthContex";
const Login = () => {
  const router = useRouter();
  const { user, setUser, isAuth, setIsAuth } = useAuthContex();

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!details.email || !details.password) {
      return toast.error("Please provide all required fields");
    }

    const toastId = toast.loading("Signing In...");

    try {
      const { data } = await userLogin(details);
      if (data?.status !== "success") {
        throw new Error(data?.message);
      }

      toast.success(data?.message, {
        id: toastId,
      });
      setUser(data?.data?.user);
      setIsAuth(true);

      setDetails({
        email: "",
        password: "",
      });

      console.log("pising to home page");
      router.push("/");
      console.log("pising to home page 1");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message, {
        id: toastId,
      });
    }
  };

  return (
    <div className="w-full my-10 text-white ">
      <div className="flex items-center justify-center flex-wrap md:gap-24 w-full">
        <div className=" ">
          <Image
            src={userLoginSvg}
            alt="logo"
            className="rounded-xl"
            width={200}
            height={200}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "20px",
            }}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-center w-[80%] md:w-[35%]  gap-y-5"
        >
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

          <div className="w-full flex flex-col space-y-2">
            <label htmlFor="name" className="px-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password Here"
              className="w-full bg-gray-600 rounded-md focus:outline-none px-2 py-2  font-medium "
              onChange={handleInputChange}
              value={details.password}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-5 mt-5 ">
            <button
              className="w-full bg-blue-600 rounded-md focus:outline-none px-2 py-3  font-medium"
              type="submit"
            >
              Login
            </button>

            <button
              className="w-full bg-red-600 rounded-md focus:outline-none px-2 py-3  font-medium"
              onClick={() => {
                setDetails({
                  email: "",
                  password: "",
                });
              }}
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

export default Login;
