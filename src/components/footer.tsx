import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white bg-opacity-25 dark:bg-gray-800 fixed-bottom w-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-white block text-center mb-2 sm:mb-0 dark:text-gray-400 sm:inline">
          © 2024{" "}
          <a href="#" className="hover:underline">
            Grama-Check
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center justify-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
          <li className="mb-2 sm:mb-0">
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li className="mb-2 sm:mb-0">
            <a href="#" className="hover:underline me-4 md:me-6">
              GitHub
            </a>
          </li>
          <li className="mb-2 sm:mb-0">
            <a href="#" className="hover:underline me-4 md:me-6">
              Team
            </a>
          </li>
          <li className="mb-2 sm:mb-0">
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
