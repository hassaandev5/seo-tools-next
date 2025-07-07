import Link from "next/link";
import { FaHome, FaTools } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
      {/* 404 Image/Illustration */}
      <div className="mb-8 relative">
        <div className="text-9xl font-bold text-emerald-600/10 dark:text-emerald-500/10">
          404
        </div>
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-full p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <FaSearch className="text-4xl text-emerald-600 dark:text-emerald-400" />
          </div>
        </div> */}
      </div>

      {/* Error Message */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Page Not Found
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Navigation Options */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="btn btn-primary btn-lg btn-icon-left">
          <FaHome />
          Back to Home
        </Link>

        <Link href="/tools" className="btn btn-outline btn-lg btn-icon-left">
          <FaTools />
          Explore Tools
        </Link>
      </div>

      {/* Search suggestion */}
      {/* <div className="mt-12 max-w-md w-full">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-600">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Try searching for what you need
          </h3>

          <div className="input-container input-container-full">
            <div className="relative">
              <div className="input-left-icon">
                <FaSearch className="input-icon" />
              </div>
              <input
                type="text"
                placeholder="Search our SEO tools..."
                className="input input-standard input-md input-with-left-icon"
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
