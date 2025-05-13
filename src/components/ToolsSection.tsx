import { JSX } from "react";
import {
  FaFileAlt,
  FaSearch,
  FaLink,
  FaTag,
  FaTachometerAlt,
  FaCalculator,
  FaArrowRight,
} from "react-icons/fa";
// import Button from "./ui/Button";

// Tool type definition
interface Tool {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const ToolsSection = () => {
  // Tools data
  const tools: Tool[] = [
    {
      id: 1,
      title: "Article Rewriter",
      description:
        "Transform your content with AI-powered rewriting that maintains context and improves readability.",
      icon: <FaFileAlt className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Plagiarism Checker",
      description:
        "Verify your content's originality against billions of web pages and ensure it's unique.",
      icon: <FaSearch className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Backlink Maker",
      description:
        "Generate high-quality backlinks to improve your website's authority and search rankings.",
      icon: <FaLink className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Meta Tags Analyzer",
      description:
        "Analyze and optimize your meta tags for better search engine visibility and click-through rates.",
      icon: <FaTag className="w-5 h-5" />,
    },
    {
      id: 5,
      title: "Page Speed Checker",
      description:
        "Test your website's loading speed and get actionable tips to improve performance.",
      icon: <FaTachometerAlt className="w-5 h-5" />,
    },
    {
      id: 6,
      title: "Words Count",
      description:
        "Count words, characters, sentences and estimate reading time for your content.",
      icon: <FaCalculator className="w-5 h-5" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 relative">
      {/* Section header  */}
      <div className="text-center mb-16 relative">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Our{" "}
          <span className="text-emerald-600 dark:text-emerald-400">Tools</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          We provide the best SEO tools with fast service and easy to use
        </p>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700 group hover:-translate-y-1"
          >
            {/* Icon with background */}
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full mb-6 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
              <div className="text-emerald-600 dark:text-emerald-400">
                {tool.icon}
              </div>
            </div>

            {/* Tool title */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              {tool.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-8 flex-grow">
              {tool.description}
            </p>

            {/* Learn more button */}
            <a
              href="#"
              className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-300"
            >
              Learn More
              <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>

      {/* More tools button */}
      <div className="mt-16 text-center">
        {/* <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition shadow-md hover:shadow-lg inline-flex items-center">
          More Tools
          <FaArrowRight className="ml-2" />
        </button> */}
        {/* <Button icon={FaArrowRight} size="lg" className="mr-2">
          More Tools
        </Button> */}
        <button className="btn btn-lg btn-primary btn-icon-right">
          More Tools
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default ToolsSection;
