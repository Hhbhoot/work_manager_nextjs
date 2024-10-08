"use client";
import { useAuthContex } from "@/Contex/AuthContex";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const { user } = useAuthContex();
  return (
    <footer className="bg-blue-800 text-white py-8 mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between px-2 md:px-10 items-start">
          {/* Left section - Logo and Links */}
          <div className="mb-6 md:mb-0 w-[90%] md:w-[50%] ">
            <h1 className="text-xl font-bold mb-2">Work Manager</h1>
            <p className="text-sm leading-5 font-normal">
              Work Manager is a powerful, intuitive app designed to help you
              streamline your tasks and boost productivity. Whether you're
              managing personal to-dos or overseeing team projects, our app
              provides an easy-to-use interface to organize, prioritize and
              complete tasks.
            </p>
          </div>
          {user && (
            <ul className="flex flex-col items-start justify-start space-y-4 ">
              <li>
                <Link href="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/show-task" className="hover:text-gray-400">
                  Show Task
                </Link>
              </li>
              <li>
                <Link href="/add-task" className="hover:text-gray-400">
                  Add Task
                </Link>
              </li>
            </ul>
          )}

          {/* Right section - Social Links and Contact */}
          <ul className="flex flex-col items-start justify-start space-y-4 ">
            <li>
              <a
                href="https://www.linkedin.com/in/hitesh-bhoot-2b46972b1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/hhbhoot"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <p className="text-sm mt-5 text-center text-wrap">
          © {new Date().getFullYear()} Work Manager. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
