'use client'; 

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link"; 
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">
                SEO Tools
              </span>
            </div>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 rounded-md font-medium"
            >
              Home
            </Link>

            <Link
              href="/tools"
              className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 rounded-md font-medium"
            >
              Tools
            </Link>

            <Link
              href="#"
              className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 rounded-md font-medium"
            >
              Contact Us
            </Link>

            <Link
              href="#"
              className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 rounded-md font-medium"
            >
              About
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Dark mode toggle */}
            <ThemeToggle />

            {/* Login button */}
            <Link
              href="/login"
              className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 rounded-md font-medium"
            >
              Login
            </Link>

            {/* Register button */}
            <Link
              href="/register"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {/* Dark mode toggle */}
            <ThemeToggle className="mr-2" />

            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md font-medium"
          >
            Home
          </Link>
          <Link
            href="/tools"
            className="block text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md font-medium"
          >
            Tools
          </Link>
          <Link
            href="#"
            className="block text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md font-medium"
          >
            Contact Us
          </Link>
          <Link
            href="#"
            className="block text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md font-medium"
          >
            About
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/login"
              className="block text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="block mt-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-md font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;