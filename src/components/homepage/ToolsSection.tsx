import Link from "next/link";
import { JSX } from "react";
import { FaArrowRight } from "react-icons/fa";
import { tools } from "@/data/toolsData";
// import Button from "./ui/Button";

const ToolsSection = () => {
  const featuredTools = tools.slice(0, 6);

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
        {featuredTools.map((tool) => (
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
            <Link
              href={`/${tool.slug}`}
              className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-300"
            >
              Learn More
              <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>

      {/* More tools button */}

      {/* <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition shadow-md hover:shadow-lg inline-flex items-center">
          More Tools
          <FaArrowRight className="ml-2" />
        </button> */}
      {/* <Button icon={FaArrowRight} size="lg" className="mr-2">
          More Tools
        </Button> */}
      <div className="mt-16 text-center">
        <Link href="/tools">
          <button className="btn btn-lg btn-primary btn-icon-right">
            More Tools
            <FaArrowRight />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ToolsSection;
