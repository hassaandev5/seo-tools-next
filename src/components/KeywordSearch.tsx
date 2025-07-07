"use client";
import React, { useState } from "react";
import {
  FaSearch,
  FaSpinner,
  FaClock,
  FaChartLine,
  FaKey,
  FaHashtag,
  FaTrophy,
} from "react-icons/fa";

interface KeywordData {
  count: number;
  density: number;
  wordCount: number;
}

interface SearchResult {
  title: string;
  totalResults: string;
  searchTerms: string;
  searchTime: number;
  cached?: boolean;
  cachedAt?: string;
  keywords: Record<string, KeywordData>;
  keywordCount: number;
}

const KeywordSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<number>(1);
  const [topCount, setTopCount] = useState<number>(10); // Default to Top 10

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/search-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm: searchTerm.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: string) => {
    return parseInt(num).toLocaleString();
  };

  const getKeywordsByWordCount = (
    keywords: Record<string, KeywordData>,
    wordCount: number,
    limit: number = 10
  ) => {
    return Object.entries(keywords)
      .filter(([, data]) => data.wordCount === wordCount)
      .sort(([, a], [, b]) => b.density - a.density) // Sort by density (highest first)
      .slice(0, limit); // Get top N results
  };

  const getKeywordCountByWordCount = (
    keywords: Record<string, KeywordData>,
    wordCount: number
  ) => {
    return Object.entries(keywords).filter(
      ([, data]) => data.wordCount === wordCount
    ).length;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Keyword Research Tool
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Discover search volume and keyword density data for your keywords
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter your keyword (e.g., best javascript frameworks 2025)"
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              disabled={loading}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-8 py-3 rounded-lg font-medium transition shadow-md hover:shadow-lg flex items-center justify-center"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Analyzing Keywords...
              </>
            ) : (
              <>
                Analyze Keywords
                <FaSearch className="ml-2" />
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                <FaChartLine className="mr-3 text-emerald-600" />
                Search Analytics
              </h2>
              {result.cached && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  Cached Result
                </span>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                      Search Results
                    </p>
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                      {formatNumber(result.totalResults)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                    <FaSearch className="text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      Search Time
                    </p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {result.searchTime.toFixed(3)}s
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <FaClock className="text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                      Total Keywords
                    </p>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                      {result.keywordCount}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <FaKey className="text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">
                      Competition
                    </p>
                    <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                      High
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <FaChartLine className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search Details */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Search Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    Search Term:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    "{result.searchTerms}"
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    Query Title:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white text-right max-w-md truncate">
                    {result.title}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Keywords Analysis with Tabs */}
          {result.keywordCount > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                  <FaTrophy className="mr-3 text-emerald-600" />
                  Top Keywords by Density
                </h3>

                {/* Top 5/Top 10 Toggle */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Show:
                  </span>
                  <button
                    onClick={() => setTopCount(5)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      topCount === 5
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    Top 5
                  </button>
                  <button
                    onClick={() => setTopCount(10)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      topCount === 10
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    Top 10
                  </button>
                  <button
                    onClick={() => setTopCount(15)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      topCount === 15
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    Top 15
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="flex space-x-8">
                  {[1, 2, 3, 4].map((wordCount) => {
                    const count = getKeywordCountByWordCount(
                      result.keywords,
                      wordCount
                    );
                    return (
                      <button
                        key={wordCount}
                        onClick={() => setActiveTab(wordCount)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab === wordCount
                            ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        }`}
                      >
                        {wordCount} Word{wordCount > 1 ? "s" : ""} ({count})
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Keywords Display */}
              {getKeywordsByWordCount(result.keywords, activeTab, topCount)
                .length > 0 ? (
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Keyword
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Count
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Density
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Visual
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {getKeywordsByWordCount(
                        result.keywords,
                        activeTab,
                        topCount
                      ).map(([keyword, data], index) => (
                        <tr
                          key={keyword}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            <div className="flex items-center">
                              {index < 3 && (
                                <FaTrophy
                                  className={`mr-2 ${
                                    index === 0
                                      ? "text-yellow-500"
                                      : index === 1
                                      ? "text-gray-400"
                                      : "text-amber-600"
                                  }`}
                                />
                              )}
                              #{index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {keyword}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {data.count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              {data.density}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${Math.min(data.density * 10, 100)}%`,
                                }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <FaHashtag className="mx-auto text-4xl mb-4 opacity-50" />
                  <p>
                    No {activeTab}-word keywords found with the current filters.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KeywordSearch;
