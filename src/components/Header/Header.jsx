"use client";
import { useAuthContex } from "@/Contex/AuthContex";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user, handleLogout } = useAuthContex();
  return (
    <div className="w-full bg-blue-700">
      <div className="flex items-center justify-between px-10 h-12">
        <div className="text-base">
          <Link href="/">
            <h1 className="text-white font-bold">Work Manager</h1>
          </Link>
        </div>
        <div>
          {user && (
            <ul className="flex items-center gap-5">
              <li>
                <Link href="/">
                  <h1 className="text-white font-normal">Home</h1>
                </Link>
              </li>
              <li>
                <Link href="/show-task">
                  <h1 className="text-white font-normal">Show Task</h1>
                </Link>
              </li>
              <li>
                <Link href="/add-task">
                  <h1 className="text-white font-normal">Add Task</h1>
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div>
          {!user ? (
            <ul className="flex items-center gap-5">
              <li>
                <Link href="/signup">
                  <h1 className="text-white font-semibold">Sign Up</h1>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <h1 className="text-white font-semibold">Login</h1>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center gap-5">
              <li className="text-white font-semibold">{user?.name}</li>
              <li
                className="text-white font-semibold cursor-pointer"
                onClick={handleLogout}
              >
                Log Out
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
