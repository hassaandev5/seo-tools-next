import { FaSearch, FaChartLine, FaTools } from "react-icons/fa";
import { BiHealth } from "react-icons/bi";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import Link from "next/link";
// import Button from "./ui/Button";

const Features = () => {
  const tools = [
    {
      icon: <BiHealth className="text-2xl" />,
      title: "Ensure Health Of Your Website",
      description:
        "Comprehensive site audits to identify and fix technical SEO issues that could be hurting your rankings.",
    },
    {
      icon: <MdOutlineScreenSearchDesktop className="text-2xl" />,
      title: "Top In Search Results",
      description:
        "Keyword research and optimization tools to help you climb to the top positions in search engines.",
    },
    {
      icon: <FaSearch className="text-2xl" />,
      title: "Make It Easy To Find",
      description:
        "Content optimization suggestions to make your pages more discoverable and relevant to searchers.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            We offer the best tools for{" "}
            <span className="text-emerald-600 dark:text-emerald-400">SEO</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our suite of powerful SEO tools helps you analyze, optimize, and
            improve your website&apos;s performance to drive more organic
            traffic.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Illustration with centered window */}
          <div className="relative flex justify-center items-center">
            <div className="bg-emerald-100/50 dark:bg-emerald-900/20 rounded-2xl w-full h-full absolute"></div>

            {/* Centered window illustration */}
            <div className="relative z-10 max-w-md w-full mx-auto my-16">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                {/* Window controls */}
                <div className="px-4 py-3 flex items-center space-x-2 bg-gray-50 dark:bg-gray-700">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>

                {/* Tool grid */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-emerald-100 dark:bg-emerald-800/30 p-4 rounded-lg flex items-center justify-center">
                      <FaSearch className="text-emerald-500 dark:text-emerald-400 text-xl" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-center">
                      <FaChartLine className="text-emerald-500 dark:text-emerald-400 text-xl" />
                    </div>
                    <div className="bg-emerald-100 dark:bg-emerald-800/30 p-4 rounded-lg flex items-center justify-center">
                      <FaTools className="text-emerald-500 dark:text-emerald-400 text-xl" />
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-center">
                      <FaSearch className="text-emerald-500 dark:text-emerald-400 text-xl" />
                    </div>
                    <div className="bg-emerald-100 dark:bg-emerald-800/30 p-4 rounded-lg flex items-center justify-center">
                      <FaChartLine className="text-emerald-500 dark:text-emerald-400 text-xl" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-center">
                      <FaTools className="text-emerald-500 dark:text-emerald-400 text-xl" />
                    </div>
                  </div>

                  {/* Content lines */}
                  <div className="mt-6 space-y-3">
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full w-full"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full w-5/6"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full w-4/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Features list */}
          <div className="space-y-8">
            {tools.map((tool, index) => (
              <div key={index} className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    {tool.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tool.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-6">
              {/* <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition shadow-md hover:shadow-lg flex items-center justify-center">
                Use Tools
                <FaTools className="ml-2" />
              </button> */}
              {/* <Button size="lg" icon={FaTools} className="mr-2">
                Use Tools
              </Button> */}
              <Link href="/tools">
                <button className="btn btn-primary btn-lg btn-icon-right">
                  Use Tools
                  <FaTools />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
