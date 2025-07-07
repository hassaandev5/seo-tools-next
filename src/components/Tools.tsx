"use client";

import { useState } from "react";
import {
  FaFileAlt,
  FaSearch,
  FaLink,
  FaTag,
  FaTachometerAlt,
  FaCalculator,
  FaArrowRight,
  FaGlobe,
  FaChartBar,
  FaMobile,
  FaKeyboard,
  FaSitemap,
  FaRobot,
  FaHashtag,
  FaMagnet,
  FaRegFileImage,
  FaEdit,
} from "react-icons/fa";
import Link from "next/link";

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

  // Extended tools data with slugs
  const tools: Tool[] = [
    {
      id: 1,
      title: "Words Count",
      description:
        "Count words, characters, sentences and estimate reading time for your content.",
      icon: <FaCalculator className="w-5 h-5" />,
      category: "content",
      slug: "word-count",
      isPopular: true,
    },
    {
      id: 2,
      title: "Case Converter",
      description:
        "Change Text Case Just paste your text and change the case according to your needs",
      icon: <FaRegFileImage className="w-5 h-5" />,
      category: "content",
      slug: "case-converter",
    },
    {
      id: 3,
      title: "Online Text Editor",
      description:
        "Rich text editor with formatting options, spell check, and export capabilities for creating professional documents.",
      icon: <FaEdit className="w-5 h-5" />,
      category: "content",
      slug: "online-text-editor",
      isPopular: true,
    },

    {
      id: 4,
      title: "Meta Tags Analyzer",
      description:
        "Analyze and optimize your meta tags for better search engine visibility and click-through rates.",
      icon: <FaTag className="w-5 h-5" />,
      category: "technical",
      slug: "meta-tags-analyzer",
      isPopular: true,
    },
    {
      id: 5,
      title: "Page Speed Checker",
      description:
        "Test your website's loading speed and get actionable tips to improve performance.",
      icon: <FaTachometerAlt className="w-5 h-5" />,
      category: "technical",
      slug: "page-speed-checker",
      isPopular: true,
    },
    {
      id: 6,
      title: "Article Rewriter",
      description:
        "Transform your content with AI-powered rewriting that maintains context and improves readability.",
      icon: <FaFileAlt className="w-5 h-5" />,
      category: "content",
      slug: "article-rewriter",
      isPopular: true,
    },
    {
      id: 7,
      title: "Keyword Research",
      description:
        "Discover high-performing keywords to target in your content strategy.",
      icon: <FaKeyboard className="w-5 h-5" />,
      category: "research",
      slug: "keyword-research",
    },
    {
      id: 8,
      title: "Website Analyzer",
      description:
        "Get a comprehensive analysis of your website's SEO health and performance.",
      icon: <FaGlobe className="w-5 h-5" />,
      category: "analytics",
      slug: "website-analyzer",
    },
    {
      id: 9,
      title: "SEO Rank Tracker",
      description:
        "Monitor your website's search engine rankings for your target keywords over time.",
      icon: <FaChartBar className="w-5 h-5" />,
      category: "analytics",
      slug: "seo-rank-tracker",
    },
    {
      id: 10,
      title: "Mobile Friendliness Test",
      description:
        "Check if your website is optimized for mobile devices and get suggestions for improvement.",
      icon: <FaMobile className="w-5 h-5" />,
      category: "technical",
      slug: "mobile-friendly-test",
    },
    {
      id: 11,
      title: "XML Sitemap Generator",
      description:
        "Create an XML sitemap to help search engines crawl and index your website more efficiently.",
      icon: <FaSitemap className="w-5 h-5" />,
      category: "technical",
      slug: "xml-sitemap-generator",
    },
    {
      id: 12,
      title: "AI Content Generator",
      description:
        "Generate SEO-optimized content with our advanced AI writing assistant.",
      icon: <FaRobot className="w-5 h-5" />,
      category: "content",
      slug: "ai-content-generator",
    },
    {
      id: 13,
      title: "Hashtag Generator",
      description:
        "Create relevant hashtags for your social media posts to increase reach and engagement.",
      icon: <FaHashtag className="w-5 h-5" />,
      category: "content",
      slug: "hashtag-generator",
    },
    {
      id: 14,
      title: "Domain Authority Checker",
      description:
        "Check your website's domain authority score and compare with competitors.",
      icon: <FaMagnet className="w-5 h-5" />,
      category: "analytics",
      slug: "domain-authority-checker",
    },
    {
      id: 15,
      title: "Image Alt Text Generator",
      description:
        "Generate SEO-friendly alt text descriptions for your images to improve accessibility and rankings.",
      icon: <FaRegFileImage className="w-5 h-5" />,
      category: "content",
      slug: "image-alt-text-generator",
    },
    {
      id: 16,
      title: "Plagiarism Checker",
      description:
        "Verify your content's originality against billions of web pages and ensure it's unique.",
      icon: <FaSearch className="w-5 h-5" />,
      category: "content",
      slug: "plagiarism-checker",
      isPopular: true,
    },
    {
      id: 17,
      title: "Backlink Maker",
      description:
        "Generate high-quality backlinks to improve your website's authority and search rankings.",
      icon: <FaLink className="w-5 h-5" />,
      category: "technical",
      slug: "backlink-maker",
      isPopular: true,
    },
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
