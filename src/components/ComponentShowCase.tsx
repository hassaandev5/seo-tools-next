"use client"

import React, { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaEyeSlash,
  FaChartLine,
  FaEnvelope,
  FaLink,
  FaExclamationTriangle,
  FaExclamationCircle,
  FaTimesCircle,
  FaCheckCircle,
  FaInfoCircle,
  FaCircleNotch,
  FaTimes,
} from "react-icons/fa";


const ComponentShowcase: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          UI Components
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Components Made using TailwindCSS
        </p>
      </div>

      {/* Buttons Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          Buttons
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Primary
            </h3>
            <div className="flex flex-col space-y-3">
              <button className="btn btn-primary btn-sm">Small Button</button>
              <button className="btn btn-primary btn-md">Default Button</button>
              <button className="btn btn-primary btn-lg">Large Button</button>
              <button className="btn btn-primary btn-md btn-icon-right">
                With Icon
                <FaChartLine />
              </button>
              <button className="btn btn-primary btn-md btn-icon-left">
                <FaChartLine />
                Icon Left
              </button>
              <button className="btn btn-primary btn-md btn-disabled" disabled>
                <FaCircleNotch className="spinner" />
                Loading
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Secondary
            </h3>
            <div className="flex flex-col space-y-3">
              <button className="btn btn-secondary btn-sm">Small Button</button>
              <button className="btn btn-secondary btn-md">
                Default Button
              </button>
              <button className="btn btn-secondary btn-lg">Large Button</button>
              <button className="btn btn-secondary btn-md btn-icon-right">
                With Icon
                <FaChartLine />
              </button>
              <button
                className="btn btn-secondary btn-md btn-disabled"
                disabled
              >
                Disabled
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Outline
            </h3>
            <div className="flex flex-col space-y-3">
              <button className="btn btn-outline btn-sm">Small Button</button>
              <button className="btn btn-outline btn-md">Default Button</button>
              <button className="btn btn-outline btn-lg">Large Button</button>
              <button className="btn btn-outline btn-md btn-icon-right">
                With Icon
                <FaChartLine />
              </button>
              <button className="btn btn-outline btn-md btn-disabled" disabled>
                Disabled
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Ghost
            </h3>
            <div className="flex flex-col space-y-3">
              <button className="btn btn-ghost btn-sm">Small Button</button>
              <button className="btn btn-ghost btn-md">Default Button</button>
              <button className="btn btn-ghost btn-lg">Large Button</button>
              <button className="btn btn-ghost btn-md btn-icon-right">
                With Icon
                <FaChartLine />
              </button>
              <button className="btn btn-ghost btn-md btn-disabled" disabled>
                Disabled
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Full Width
          </h3>
          <button className="btn btn-primary btn-md btn-full btn-icon-right">
            Search
            <FaSearch />
          </button>
        </div>
      </section>

      {/* Inputs Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          Inputs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Default Input */}
            <div className="input-container">
              <label htmlFor="default-input" className="input-label">
                Default Input
              </label>
              <div className="relative">
                <input
                  id="default-input"
                  type="text"
                  placeholder="Enter your text here"
                  className="input input-standard input-md input-padding"
                />
              </div>
              <p className="input-helper-text">This is a helper text</p>
            </div>

            {/* Filled Style with left icon */}
            <div className="input-container">
              <label htmlFor="filled-input" className="input-label">
                Filled Style
              </label>
              <div className="relative">
                <div className="input-left-icon">
                  <FaSearch className="input-icon" />
                </div>
                <input
                  id="filled-input"
                  type="text"
                  placeholder="Search anything..."
                  className="input input-filled input-md input-with-left-icon"
                />
              </div>
            </div>

            {/* Outlined Style */}
            <div className="input-container">
              <label htmlFor="outlined-input" className="input-label">
                Outlined Style
              </label>
              <div className="relative">
                <input
                  id="outlined-input"
                  type="text"
                  placeholder="Type something..."
                  className="input input-outlined input-md input-padding"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Password with clickable right icon */}
            <div className="input-container">
              <label htmlFor="password-input" className="input-label">
                Password
                <span className="input-required">*</span>
              </label>
              <div className="relative">
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-standard input-md input-padding input-with-right-icon"
                  required
                />
                <div
                  className="input-right-icon input-right-icon-clickable"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="input-icon" />
                  ) : (
                    <FaEye className="input-icon" />
                  )}
                </div>
              </div>
            </div>

            {/* Input with Error */}
            <div className="input-container">
              <label htmlFor="error-input" className="input-label">
                With Error
              </label>
              <div className="relative">
                <div className="input-left-icon">
                  <FaEnvelope className="input-icon input-icon-error" />
                </div>
                <input
                  id="error-input"
                  type="email"
                  placeholder="error@example.com"
                  className="input input-standard input-md input-with-left-icon input-error"
                />
              </div>
              <p className="input-error-text">
                Please enter a valid email address
              </p>
            </div>

            {/* Small Size */}
            <div className="input-container">
              <label htmlFor="small-input" className="input-label">
                Small Size
              </label>
              <div className="relative">
                <div className="input-left-icon">
                  <FaLink className="input-icon" />
                </div>
                <input
                  id="small-input"
                  type="text"
                  placeholder="Compact input"
                  className="input input-standard input-sm input-with-left-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          Alerts
        </h2>

        <div className="space-y-4">
          {/* Success Alert */}
          <div className="rounded-lg border p-4 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-700 shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaCheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Success!</h3>
                    <div className="mt-2 text-sm text-emerald-800 dark:text-emerald-300">
                      Your SEO analysis was completed successfully.
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-4 mt-0.5 inline-flex text-emerald-800 dark:text-emerald-300 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <span className="sr-only">Dismiss</span>
                    <FaTimes className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Info Alert */}
          <div className="rounded-lg border p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-700 shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaInfoCircle className="h-5 w-5 text-blue-500 dark:text-blue-400" aria-hidden="true" />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Information</h3>
                    <div className="mt-2 text-sm text-blue-800 dark:text-blue-300">
                      Your website analysis is being processed. This might take a few minutes.
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-4 mt-0.5 inline-flex text-blue-800 dark:text-blue-300 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <span className="sr-only">Dismiss</span>
                    <FaTimes className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Warning Alert */}
          <div className="rounded-lg border p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-400 dark:border-amber-700 shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400" aria-hidden="true" />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Warning</h3>
                    <div className="mt-2 text-sm text-amber-800 dark:text-amber-300">
                      Some pages on your website are not optimized for mobile devices.
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-4 mt-0.5 inline-flex text-amber-800 dark:text-amber-300 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 cursor-pointer"
                  >
                    <span className="sr-only">Dismiss</span>
                    <FaTimes className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          <div className="rounded-lg border p-4 bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-700 shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaTimesCircle className="h-5 w-5 text-red-500 dark:text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Error</h3>
                    <div className="mt-2 text-sm text-red-800 dark:text-red-300">
                      Unable to analyze your website. Please check the URL and try again.
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-4 mt-0.5 inline-flex text-red-800 dark:text-red-300 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                  >
                    <span className="sr-only">Dismiss</span>
                    <FaTimes className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text Area Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          Text Areas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Default TextArea */}
            <div className="textarea-container">
              <label htmlFor="default-textarea" className="textarea-label">
                Default TextArea
              </label>
              <div className="relative">
                <textarea
                  id="default-textarea"
                  rows={4}
                  placeholder="Enter your content here..."
                  className="textarea"
                ></textarea>
              </div>
              <p className="textarea-helper-text">
                This is a simple text area for longer content
              </p>
            </div>

            {/* With Character Count */}
            <div className="textarea-container">
              <div className="textarea-label-container">
                <label htmlFor="char-count-textarea" className="textarea-label">
                  With Character Count
                </label>
                <span className="textarea-char-count" id="char-count-display">
                  0/160
                </span>
              </div>
              <div className="relative">
                <textarea
                  id="char-count-textarea"
                  maxLength={160}
                  placeholder="Enter your meta description..."
                  className="textarea"
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    const count = target.value.length;
                    const countDisplay =
                      document.getElementById("char-count-display");
                    if (countDisplay) {
                      countDisplay.textContent = `${count}/160`;
                      countDisplay.className =
                        "textarea-char-count" +
                        (count >= 144
                          ? count >= 160
                            ? " textarea-char-count-limit"
                            : " textarea-char-count-warning"
                          : "");
                    }
                  }}
                ></textarea>
              </div>
              <p className="textarea-helper-text">
                Optimal meta description length is between 120-160 characters
              </p>
            </div>

            {/* Auto-growing TextArea */}
            <div className="textarea-container">
              <label htmlFor="auto-grow-textarea" className="textarea-label">
                Auto-growing TextArea
              </label>
              <div className="relative">
                <textarea
                  id="auto-grow-textarea"
                  rows={1}
                  placeholder="This textarea will grow as you type..."
                  className="textarea textarea-auto-grow"
                  style={{ maxHeight: "200px" }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${Math.min(
                      target.scrollHeight,
                      200
                    )}px`;
                  }}
                ></textarea>
              </div>
              <p className="textarea-helper-text">
                The textarea automatically expands as you type
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* SEO Content Analysis */}
            <div className="textarea-container">
              <label htmlFor="success-textarea" className="textarea-label">
                SEO Content Analysis
              </label>
              <div className="relative">
                <textarea
                  id="success-textarea"
                  rows={6}
                  placeholder="Paste your page content here for keyword analysis..."
                  className="textarea textarea-success"
                  defaultValue="SEO, Marketing, Analysis"
                ></textarea>
                <div className="textarea-icon-container cursor-pointer">
                  <FaChartLine className="textarea-icon textarea-icon-success" />
                </div>
              </div>
              <p className="textarea-helper-text textarea-helper-success">
                Your content has good keyword density
              </p>
            </div>

            {/* With Warning */}
            <div className="textarea-container">
              <label htmlFor="warning-textarea" className="textarea-label">
                With Warning
              </label>
              <div className="relative">
                <textarea
                  id="warning-textarea"
                  rows={4}
                  placeholder="Enter your keywords, separated by commas..."
                  className="textarea textarea-warning"
                  defaultValue="seo, marketing"
                ></textarea>
                <div className="textarea-icon-container">
                  <FaExclamationTriangle className="textarea-icon textarea-icon-warning" />
                </div>
              </div>
              <p className="textarea-helper-text textarea-helper-warning">
                Consider adding at least one more keyword
              </p>
            </div>

            {/* With Error */}
            <div className="textarea-container">
              <label htmlFor="error-textarea" className="textarea-label">
                With Error
              </label>
              <div className="relative">
                <textarea
                  id="error-textarea"
                  rows={4}
                  placeholder="Enter your keywords, separated by commas..."
                  className="textarea textarea-error"
                  defaultValue="seo, marketing"
                ></textarea>
                <div className="textarea-icon-container">
                  <FaExclamationCircle className="textarea-icon textarea-icon-error" />
                </div>
              </div>
              <p className="textarea-helper-text textarea-helper-error">
                Please enter at least 3 keywords
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComponentShowcase;