"use client";

import { useState } from "react";
import {
  FaSearch,
  FaCalculator,
  FaArrowRight,
  FaKeyboard,
  FaRegFileImage,
  FaEdit,
  FaFingerprint,
} from "react-icons/fa";
import Link from "next/link";
import { tools } from "@/data/tools";

// Tool type definition
interface Tool {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  slug: string; // Add slug property
  isPopular?: boolean;
}

const ToolsPage = () => {
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Categories
  const categories = [
    { id: "all", name: "All Tools" },
    { id: "content", name: "Content" },
    { id: "research", name: "Research" },
    { id: "technical", name: "Technical" },
    { id: "analytics", name: "Analytics" },
  ];

  // Filter tools based on selected category and search term
  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12">
      {/* Page header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          SEO{" "}
          <span className="text-emerald-600 dark:text-emerald-400">Tools</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover our comprehensive collection of SEO tools designed to help
          you improve your website&apos;s visibility, performance, and rankings.
        </p>
      </div>

      {/* Search and filter section */}
      <div className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search input */}
          <div className="input-container md:w-1/3">
            <div className="relative">
              <div className="input-left-icon">
                <FaSearch className="input-icon" />
              </div>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-standard input-md input-with-left-icon"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-emerald-600 text-white dark:bg-emerald-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular tools section */}
      {/* {selectedCategory === "all" && searchTerm === "" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Popular Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools
              .filter((tool) => tool.isPopular)
              .map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col border border-gray-100 dark:border-gray-700 group hover:-translate-y-1"
                >
                  <div className="flex items-start mb-4">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mr-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
                      <div className="text-emerald-600 dark:text-emerald-400">
                        {tool.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {tool.title}
                      </h3>
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                        {categories.find((c) => c.id === tool.category)?.name}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">
                    {tool.description}
                  </p>
                  <Link
                    href={`/${tool.slug}`}
                    className="btn btn-primary btn-sm btn-icon-right mt-auto"
                  >
                    Use Tool
                    <FaArrowRight />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )} */}

      {/* All tools section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {selectedCategory === "all"
            ? "All Tools"
            : categories.find((c) => c.id === selectedCategory)?.name}
          {searchTerm && ` matching "${searchTerm}"`}
        </h2>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col border border-gray-100 dark:border-gray-700 group hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mr-3 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
                    <div className="text-emerald-600 dark:text-emerald-400">
                      {tool.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {tool.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">
                  {tool.description}
                </p>
                <Link
                  href={`/${tool.slug}`}
                  className="btn btn-primary btn-sm btn-icon-right mt-auto"
                >
                  Use Tool
                  <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 text-center border border-gray-100 dark:border-gray-700">
            <div className="text-gray-500 dark:text-gray-400 mb-4 text-5xl">
              <FaSearch className="mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchTerm("");
              }}
              className="btn btn-outline btn-md mt-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsPage;
