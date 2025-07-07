import { FaSearch, FaChartLine } from "react-icons/fa";
// import Button from "./ui/Button";

const Hero = () => {
  return (
    <div className="py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side: Text content */}
        <div className="space-y-6 md:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white leading-tight">
            Boost Your{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Search
            </span>{" "}
            Rankings
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
            Powerful SEO tools to analyze, optimize, and improve your
            website&apos;s performance in search engines. Get actionable
            insights in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition shadow-md hover:shadow-lg flex items-center justify-center">
              Get Started
              <FaChartLine className="ml-2" />
            </button> */}
            {/* <Button icon={FaChartLine} size="lg">
              Get Started
            </Button> */}
            <button className="btn btn-primary btn-lg btn-icon-right">
              Get Started
              <FaChartLine />
            </button>

            {/* <button className="bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 border border-emerald-600 dark:border-emerald-500 hover:bg-gray-50 dark:hover:bg-gray-600 px-8 py-3 rounded-lg font-medium transition shadow-md hover:shadow-lg flex items-center justify-center">
              Explore Tools
              <FaSearch className="ml-2" />
            </button> */}

            <button className="btn btn-outline btn-lg btn-icon-right">
              Explore Tools
              <FaSearch />
            </button>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                15+
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                SEO Tools
              </p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                24/7
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Support
              </p>
            </div>
            <div className="text-center p-4 hidden sm:block">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                100%
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Free Tools
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Illustration */}
        <div className="flex justify-center lg:justify-end order-first lg:order-last">
          <div className="relative">
            {/* Background circle */}
            <div className="absolute inset-0 bg-emerald-200/60 dark:bg-emerald-900/30 rounded-full transform scale-110"></div>

            {/* Pattern dots */}
            <div className="absolute -right-12 -top-12 w-24 h-24 grid grid-cols-4 gap-2">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"
                ></div>
              ))}
            </div>

            {/* Main illustration */}
            <div className="relative z-10">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="pt-4 flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                      <FaSearch />
                    </div>
                    <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full w-36"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-4/6"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                      90% Score
                    </div>
                    <div className="h-8 w-8 rounded-full border-4 border-emerald-500 border-r-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
