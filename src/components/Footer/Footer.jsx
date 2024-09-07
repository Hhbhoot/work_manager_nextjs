import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between px-10 items-start">
          {/* Left section - Logo and Links */}
          <div className="mb-6 md:mb-0 w-[50%] ">
            <h1 className="text-xl font-bold mb-2">Work Manager</h1>
            <p className="text-sm leading-5 font-normal">
              Work Manager is a powerful, intuitive app designed to help you
              streamline your tasks and boost productivity. Whether you're
              managing personal to-dos or overseeing team projects, our app
              provides an easy-to-use interface to organize, prioritize and
              complete tasks.
            </p>
          </div>

          <ul className="flex flex-col space-y-4 ">
            <li>
              <a href="#" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Show Task
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Add Task
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>

          {/* Right section - Social Links and Contact */}
          <ul className="flex flex-col items-start justify-start space-y-4 ">
            <li>
              <a href="#" className="hover:text-gray-400">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <p className="text-sm mt-5 text-center">
          © {new Date().getFullYear()} Work Manager. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
