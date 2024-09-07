"use client";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="w-full bg-blue-700">
      <div className="flex items-center justify-between px-10 h-12">
        <div className="text-base">
          <h1 className="text-white font-bold">Work Manager</h1>
        </div>
        <div>
          <ul className="flex items-center gap-5">
            <li>
              <Link href="!#">
                <h1 className="text-white font-normal">Home</h1>
              </Link>
            </li>
            <li>
              <Link href="!#">
                <h1 className="text-white font-normal">Show Task</h1>
              </Link>
            </li>
            <li>
              <Link href="!#">
                <h1 className="text-white font-normal">Add Task</h1>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex items-center gap-5">
            <li>
              <Link href="!#">
                <h1 className="text-white font-semibold">Sign Up</h1>
              </Link>
            </li>
            <li>
              <Link href="!#">
                <h1 className="text-white font-semibold">Login</h1>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
