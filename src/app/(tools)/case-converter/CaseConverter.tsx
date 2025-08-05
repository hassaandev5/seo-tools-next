"use client";

import React, { useState } from "react";
import {
  FaRegFileImage,
  FaCopy,
  FaDownload,
  FaTrash,
  FaExchangeAlt,
  FaFont,
  FaTextHeight,
  FaRegCopy,
  FaCheck,
} from "react-icons/fa";

const CaseConverter: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [activeCase, setActiveCase] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Case conversion functions
  const convertToUpperCase = (text: string): string => {
    return text.toUpperCase();
  };

  const convertToLowerCase = (text: string): string => {
    return text.toLowerCase();
  };

  const convertToSentenceCase = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const convertToToggleCase = (text: string): string => {
    return text
      .split("")
      .map((char) => {
        if (char === char.toUpperCase()) {
          return char.toLowerCase();
        } else {
          return char.toUpperCase();
        }
      })
      .join("");
  };

  const convertToAlternatingCase = (text: string): string => {
    let result = "";
    let letterCount = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (/[a-zA-Z]/.test(char)) {
        if (letterCount % 2 === 0) {
          result += char.toLowerCase();
        } else {
          result += char.toUpperCase();
        }
        letterCount++;
      } else {
        result += char;
      }
    }
    return result;
  };

  const convertToTitleCase = (text: string): string => {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Handle case conversion
  const handleCaseConversion = (caseType: string) => {
    if (!inputText.trim()) return;

    let converted = "";
    switch (caseType) {
      case "upper":
        converted = convertToUpperCase(inputText);
        break;
      case "lower":
        converted = convertToLowerCase(inputText);
        break;
      case "sentence":
        converted = convertToSentenceCase(inputText);
        break;
      case "toggle":
        converted = convertToToggleCase(inputText);
        break;
      case "alternating":
        converted = convertToAlternatingCase(inputText);
        break;
      case "title":
        converted = convertToTitleCase(inputText);
        break;
      default:
        converted = inputText;
    }

    setOutputText(converted);
    setActiveCase(caseType);
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Download as text file
  const downloadAsFile = () => {
    if (!outputText) return;

    const element = document.createElement("a");
    const file = new Blob([outputText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "converted-text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Clear all text
  const clearAll = () => {
    setInputText("");
    setOutputText("");
    setActiveCase("");
  };

  // Get character and word counts
  const getStats = (text: string) => {
    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      lines: text.split("\n").length,
    };
  };

  const inputStats = getStats(inputText);
  const outputStats = getStats(outputText);

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mr-4">
              <FaRegFileImage className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Case Convertor
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transform your text with various case conversion options. Convert to
            uppercase, lowercase, sentence case, toggle case, and more.
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
                  disabled={!inputText}
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
                    rows={12}
                    placeholder="Paste or type your text here to convert..."
                    className="textarea"
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="textarea-helper-text">
                    Enter the text you want to convert
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {inputStats.characters} chars • {inputStats.words} words
                  </div>
                </div>
              </div>
            </div>

            {/* Conversion Buttons */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                Case Conversion Options
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleCaseConversion("upper")}
                  className={`btn btn-outline btn-md btn-icon-left ${
                    activeCase === "upper" ? "btn-primary" : ""
                  }`}
                  disabled={!inputText.trim()}
                >
                  <FaTextHeight />
                  UPPER CASE
                </button>
                <button
                  onClick={() => handleCaseConversion("lower")}
                  className={`btn btn-outline btn-md btn-icon-left ${
                    activeCase === "lower" ? "btn-primary" : ""
                  }`}
                  disabled={!inputText.trim()}
                >
                  <FaFont />
                  lower case
                </button>
                <button
                  onClick={() => handleCaseConversion("sentence")}
                  className={`btn btn-outline btn-md btn-icon-left ${
                    activeCase === "sentence" ? "btn-primary" : ""
                  }`}
                  disabled={!inputText.trim()}
                >
                  <FaRegCopy />
                  Sentence case
                </button>
                <button
                  onClick={() => handleCaseConversion("title")}
                  className={`btn btn-outline btn-md btn-icon-left ${
                    activeCase === "title" ? "btn-primary" : ""
                  }`}
                  disabled={!inputText.trim()}
                >
                  <FaFont />
                  Title Case
                </button>
                <button
                  onClick={() => handleCaseConversion("toggle")}
                  className={`btn btn-outline btn-md btn-icon-left ${
                    activeCase === "toggle" ? "btn-primary" : ""
                  }`}
                  disabled={!inputText.trim()}
                >
                  <FaExchangeAlt />
                  tOGGLE cASE
                </button>
                <button
                  onClick={() => handleCaseConversion("alternating")}
                  className={`btn btn-outline btn-md btn-icon-left ${
                    activeCase === "alternating" ? "btn-primary" : ""
                  }`}
                  disabled={!inputText.trim()}
                >
                  <FaExchangeAlt />
                  aLtErNaTiNg
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Converted Text
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="btn btn-secondary btn-sm btn-icon-left"
                    disabled={!outputText}
                  >
                    {copied ? <FaCheck /> : <FaCopy />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadAsFile}
                    className="btn btn-secondary btn-sm btn-icon-left"
                    disabled={!outputText}
                  >
                    <FaDownload />
                    Download
                  </button>
                </div>
              </div>

              <div className="textarea-container">
                <div className="relative">
                  <textarea
                    value={outputText}
                    readOnly
                    rows={12}
                    placeholder="Your converted text will appear here..."
                    className="textarea bg-gray-50 dark:bg-gray-800"
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="textarea-helper-text">
                    {outputText
                      ? `Converted to ${activeCase} case`
                      : "Select a conversion option above"}
                  </p>
                  {outputText && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {outputStats.characters} chars • {outputStats.words} words
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {outputText && (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                  Text Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Characters:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {outputStats.characters}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Characters (no spaces):
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {outputStats.charactersNoSpaces}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Words:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {outputStats.words}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Lines:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {outputStats.lines}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Case Conversion Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mr-4">
                  <FaTextHeight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Multiple Cases
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Convert text to uppercase, lowercase, sentence case, title case,
                toggle case, and alternating case.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mr-4">
                  <FaCopy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Easy Copy & Download
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Copy converted text to clipboard or download as a text file for
                later use.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mr-4">
                  <FaFont className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Text Statistics
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Get detailed statistics including character count, word count,
                and line count.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseConverter;
