"use client";

import React, { useState } from "react";
import {
  FaKey,
  FaCopy,
  FaCheck,
  FaLock,
  FaHashtag,
  FaTrash,
  FaExclamationCircle,
} from "react-icons/fa";
import CryptoJS from "crypto-js";

const MD5Generator: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState({
    md5: "",
    sha1: "",
    base64: "",
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState("");

  const generateHashes = () => {
    if (!inputText.trim()) {
      setError("Please enter some text to generate hashes");
      return;
    }

    if (inputText.length < 5) {
      setError("Text must be at least 5 characters long");
      return;
    }

    setError("");

    try {
      // Generate MD5 hash
      const md5 = CryptoJS.MD5(inputText).toString();

      // Generate SHA1 hash
      const sha1 = CryptoJS.SHA1(inputText).toString();

      // Generate Base64 encoding
      const base64 = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(inputText)
      );

      setResults({
        md5,
        sha1,
        base64,
      });
    } catch (error) {
      console.error("Error generating hashes:", error);
      setError("An error occurred while generating hashes");
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const clearAll = () => {
    setInputText("");
    setResults({
      md5: "",
      sha1: "",
      base64: "",
    });
    setError("");
    setCopiedField(null);
  };

  const getStats = (text: string) => {
    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      lines: text.split("\n").length,
    };
  };

  const inputStats = getStats(inputText);
  const hasResults = results.md5 || results.sha1 || results.base64;

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
              <FaHashtag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              MD5 Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Generate MD5, SHA1 hashes and Base64 encoding for any string.
            Perfect for data verification and encoding purposes.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Input Text
                </h2>
                <button
                  onClick={clearAll}
                  className="btn btn-ghost btn-sm btn-icon-left"
                  disabled={!inputText && !hasResults}
                >
                  <FaTrash />
                  Clear
                </button>
              </div>

              <div className="textarea-container">
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={10}
                    placeholder="Enter your text here (minimum 5 characters)..."
                    className={`textarea ${error ? "textarea-error" : ""}`}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p
                    className={`textarea-helper-text ${
                      error ? "textarea-helper-error" : ""
                    }`}
                  >
                    {error || "Enter the text you want to convert to hashes"}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {inputStats.characters} chars • {inputStats.words} words
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div>
              <button
                onClick={generateHashes}
                className="btn btn-primary btn-lg btn-full btn-icon-left"
                disabled={!inputText.trim() || inputText.length < 5}
              >
                <FaHashtag />
                Generate Hashes
              </button>
              {inputText.length > 0 && inputText.length < 5 && (
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-2 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  Text must be at least 5 characters long
                </p>
              )}
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Generated Hashes
                </h2>
              </div>

              <div className="space-y-4">
                {/* MD5 Hash */}
                <div className="input-container">
                  <div className="flex items-center justify-between mb-2">
                    <label className="input-label">MD5 Hash</label>
                    {results.md5 && (
                      <button
                        onClick={() => copyToClipboard(results.md5, "md5")}
                        className="btn btn-ghost btn-sm btn-icon-left"
                      >
                        {copiedField === "md5" ? <FaCheck /> : <FaCopy />}
                        {copiedField === "md5" ? "Copied!" : "Copy"}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <div className="input-left-icon">
                      <FaLock className="input-icon" />
                    </div>
                    <input
                      type="text"
                      value={results.md5}
                      placeholder="32-character MD5 hash will appear here..."
                      className="input input-outlined input-md input-with-left-icon bg-gray-50 dark:bg-gray-800"
                      readOnly
                    />
                  </div>
                </div>

                {/* SHA1 Hash */}
                <div className="input-container">
                  <div className="flex items-center justify-between mb-2">
                    <label className="input-label">SHA1 Hash</label>
                    {results.sha1 && (
                      <button
                        onClick={() => copyToClipboard(results.sha1, "sha1")}
                        className="btn btn-ghost btn-sm btn-icon-left"
                      >
                        {copiedField === "sha1" ? <FaCheck /> : <FaCopy />}
                        {copiedField === "sha1" ? "Copied!" : "Copy"}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <div className="input-left-icon">
                      <FaHashtag className="input-icon" />
                    </div>
                    <input
                      type="text"
                      value={results.sha1}
                      placeholder="40-character SHA1 hash will appear here..."
                      className="input input-outlined input-md input-with-left-icon bg-gray-50 dark:bg-gray-800"
                      readOnly
                    />
                  </div>
                </div>

                {/* Base64 Encoding */}
                <div className="input-container">
                  <div className="flex items-center justify-between mb-2">
                    <label className="input-label">Base64 Encoding</label>
                    {results.base64 && (
                      <button
                        onClick={() =>
                          copyToClipboard(results.base64, "base64")
                        }
                        className="btn btn-ghost btn-sm btn-icon-left"
                      >
                        {copiedField === "base64" ? <FaCheck /> : <FaCopy />}
                        {copiedField === "base64" ? "Copied!" : "Copy"}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <div className="input-left-icon">
                      <FaKey className="input-icon" />
                    </div>
                    <input
                      type="text"
                      value={results.base64}
                      placeholder="Base64 encoded text will appear here..."
                      className="input input-outlined input-md input-with-left-icon bg-gray-50 dark:bg-gray-800"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hash Statistics */}
            {/* {hasResults && (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                  Hash Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      MD5 Length:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {results.md5.length} characters
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      SHA1 Length:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {results.sha1.length} characters
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Base64 Length:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {results.base64.length} characters
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Input Length:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {inputText.length} characters
                    </span>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Hash Generation Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                  <FaLock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  MD5 Hashing
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Generate 128-bit MD5 hash values commonly used for file
                integrity verification and data comparison.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                  <FaHashtag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  SHA1 Hashing
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Create 160-bit SHA1 hash values for enhanced data verification
                and digital signatures.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                  <FaKey className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Base64 Encoding
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Convert text to Base64 format for safe data transmission and
                storage in text-based systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MD5Generator;
