"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const PlagiarismChecker = () => {
  const [article, setArticle] = useState("");
  const [, setSnippets] = useState<string[]>([]);
  type SearchResultItems = {
    title: string;
    link: string;
    snippet: string;
    displayLink: string;
  };
  type SearchResult = {
    snippetIndex: number;
    originalSnippet: string;
    searchResults: SearchResultItems[];
    totalResults: number;
  };

  type PlagiarismSource = {
    url: string;
    title: string;
    similarity: number;
    content: string;
  };

  type PlagiarismResult = {
    snippetIndex: number;
    originalSnippet: string;
    maxSimilarity: number;
    sources: PlagiarismSource[];
  };

  const [, setSearchResults] = useState<SearchResult[]>([]);
  const [, setIsSearching] = useState(false);
  const [plagiarismResults, setPlagiarismResults] = useState<
    PlagiarismResult[]
  >([]);
  const [overallPlagiarismScore, setOverallPlagiarismScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY;
  // const GOOGLE_CX = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CX;

  const fetchPageContent = async (url: string): Promise<string | null> => {
    try {
      // Use a CORS proxy or your own backend endpoint
      const proxyUrl = `/api/fetch-content`; // You'll need to create this API route

      const response = await fetch(proxyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) return null;

      const data = await response.json();
      return data.content || null;
    } catch (error) {
      console.error(`Error fetching content from ${url}:`, error);
      return null;
    }
  };

  const calculateSimilarity = (
    originalSnippet: string,
    pageContent: string
  ): number => {
    // Clean and normalize text
    const normalize = (text: string) =>
      text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const normalizedSnippet = normalize(originalSnippet);
    const normalizedContent = normalize(pageContent);

    const snippetWords = normalizedSnippet.split(" ");
    const contentWords = normalizedContent.split(" ");

    if (snippetWords.length === 0) return 0;

    // Method 1: Simple word overlap (recommended for plagiarism detection)
    const snippetWordSet = new Set(snippetWords);
    const contentWordSet = new Set(contentWords);

    let matchingWords = 0;
    snippetWordSet.forEach((word) => {
      if (contentWordSet.has(word) && word.length > 2) {
        // Ignore very short words
        matchingWords++;
      }
    });

    const similarity = (matchingWords / snippetWordSet.size) * 100;
    return Math.min(similarity, 100); // Cap at 100%
  };

  const analyzePlagiarism = async (searchResults: SearchResult[]) => {
    setIsAnalyzing(true);
    const plagiarismData = [];
    let totalSimilarityScore = 0;
    let totalCheckedSources = 0;

    for (const result of searchResults) {
      const snippetResults = [];
      let snippetMaxSimilarity = 0;

      // Check top 3 links for each snippet
      for (const item of result.searchResults.slice(0, 3)) {
        console.log(`Fetching content from: ${item.link}`);

        const pageContent = await fetchPageContent(item.link);

        if (pageContent) {
          const similarity = calculateSimilarity(
            result.originalSnippet,
            pageContent
          );

          snippetResults.push({
            url: item.link,
            title: item.title,
            similarity: Math.round(similarity * 100) / 100,
            content: pageContent.substring(0, 200) + "...", // Preview
          });

          snippetMaxSimilarity = Math.max(snippetMaxSimilarity, similarity);
          totalCheckedSources++;
        }

        // Add delay between requests
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      plagiarismData.push({
        snippetIndex: result.snippetIndex,
        originalSnippet: result.originalSnippet,
        maxSimilarity: snippetMaxSimilarity,
        sources: snippetResults,
      });

      totalSimilarityScore += snippetMaxSimilarity;
    }

    // Calculate overall plagiarism percentage
    const overallScore =
      searchResults.length > 0
        ? totalSimilarityScore / searchResults.length
        : 0;

    setPlagiarismResults(plagiarismData);
    setOverallPlagiarismScore(Math.round(overallScore * 100) / 100);
    setIsAnalyzing(false);

    console.log("Plagiarism Analysis Complete:", {
      overallScore: overallScore.toFixed(2) + "%",
      totalSources: totalCheckedSources,
      snippetsAnalyzed: searchResults.length,
    });
  };

  const makeSnippets = (str: string) => {
    const maxWords = 1000; // Maximum words for an article
    const maxSnippets = 10; // Total number of snippets
    const idealSnippetSize = 100; // Ideal size snippet in words

    const words = str.trim().split(/\s+/);
    console.log(words);
    const totalWords = words.length;
    console.log("Total words in the article: " + totalWords);

    if (totalWords > maxWords) {
      console.warn("Article is too long, truncating to 1000 words.");
      // return makeSnippets(words.slice(0, 1000).join(" "));
      return;
    }
    // Decide snippet size based on total words
    const sinppetCount = Math.min(
      Math.ceil(totalWords / idealSnippetSize),
      maxSnippets
    );
    const snippetSize = Math.ceil(totalWords / sinppetCount);

    const snippetList = [];
    for (let i = 0; i < totalWords; i += snippetSize) {
      const snippet = words.slice(i, i + snippetSize).join(" ");
      snippetList.push(snippet);
    }

    setSnippets(snippetList);
    console.log("Snippets generated:", snippetList);
    return snippetList;
  };

  const searchSnippets = async (snippet: string) => {
    // if (!GOOGLE_API_KEY || !GOOGLE_CX) {
    //   console.error("Google Search API credentials not configured");
    //   return null;
    // }
    // try {
    //   const response = await fetch(
    //     `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(
    //       snippet
    //     )}`
    //   );
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   // console.log(data);
    //   return data;
    // } catch (error) {
    //   console.error("Error searching snippets:", error);
    //   return null;
    // }
    try {
      const response = await fetch("/api/search-snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ snippet }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error searching snippets:", error);
      return null;
    }
  };

  const processAllSnippets = async (snippetList: string[]) => {
    setIsSearching(true);
    const allResults = [];

    // Process snippets with delay to respect rate limits
    for (let i = 0; i < snippetList.length; i++) {
      const snippet = snippetList[i];
      console.log(
        `Searching snippet ${i + 1}/${snippetList.length}:`,
        snippet.substring(0, 50) + "..."
      );

      const result = await searchSnippets(snippet);

      if (result && result.items) {
        // Extract useful information from each result
        const processedResult = {
          snippetIndex: i,
          originalSnippet: snippet,
          searchResults: result.items.map((item: SearchResultItems) => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet,
            displayLink: item.displayLink,
          })),
          totalResults: result.searchInformation?.totalResults || 0,
        };

        allResults.push(processedResult);
        console.log(
          `Found ${result.items.length} results for snippet ${i + 1}`
        );
      }

      // Add delay between requests to avoid rate limiting
      if (i < snippetList.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
      }
    }

    setSearchResults(allResults);
    setIsSearching(false);
    console.log("All search results:", allResults);
    return allResults;
  };
  const handleCheckPlagiarism = async () => {
    if (article.trim() === "") {
      alert("Please enter an article to check for plagiarism.");
      return;
    }
    // Clear previous results when starting a new check
    setSearchResults([]);
    setPlagiarismResults([]);
    setOverallPlagiarismScore(0);
    setIsSearching(false);
    setIsAnalyzing(false);

    const snippetList = makeSnippets(article);
    if (!snippetList) return; // Early return if article is too long

    // Process all snippets
    // await processAllSnippets(snippetList);

    // First get search results
    const results = await processAllSnippets(snippetList);

    // Then analyze for plagiarism
    if (results && results.length > 0) {
      await analyzePlagiarism(results);
    }

    // console.log(snippetList);
    // snippetList.forEach((snippet) => {
    //   searchSnippets(snippet);
    // });

    // Here you would typically call an API to check for plagiarism
    // For now, we will just log the snippets
    // console.log("Snippets generated:", snippets);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Plagiarism Checker
        </h1>
      </div>

      <div className="space-y-6">
        {/* Textarea with proper styling */}
        <div className="textarea-container">
          <label htmlFor="article-input" className="textarea-label">
            Article Content
          </label>
          <div className="relative">
            <textarea
              id="article-input"
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              placeholder="Enter your article here for plagiarism analysis..."
              rows={10}
              className="textarea"
              style={{ minHeight: "240px" }}
            />
          </div>
          <p className="textarea-helper-text">
            Paste or type your content to check for potential plagiarism
          </p>
        </div>

        {/* Button with proper styling */}
        <div className="flex justify-center">
          <button
            onClick={handleCheckPlagiarism}
            className="btn btn-primary btn-md btn-icon-right"
            disabled={!article.trim()}
          >
            Check Plagiarism
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Results Section */}
      {/* {isSearching && (
        <div className="text-center py-4">
          <p className="text-gray-600">Searching for potential matches...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mt-2"></div>
        </div>
      )}

      {!isSearching && searchResults.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Search Results
          </h2>
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
            >
              <h3 className="font-semibold text-lg mb-2">
                Snippet {result.snippetIndex + 1} ({result.totalResults} total
                results)
              </h3>
              <p className="text-sm text-gray-600 mb-3 italic">
                &quot;{result.originalSnippet.substring(0, 100)}...&quot;
              </p>
              <div className="space-y-2">
                {result.searchResults
                  .slice(0, 3)
                  .map((item, itemIndex: number) => (
                    <div
                      key={itemIndex}
                      className="border-l-4 border-blue-500 pl-3"
                    >
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {item.title}
                      </a>
                      <p className="text-sm text-gray-600">
                        {item.displayLink}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {item.snippet}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )} */}

      {/* Placeholder for results */}
      {/* Plagiarism Results */}
      {isAnalyzing && (
        <div className="text-center py-4">
          <p className="text-gray-600">Checking Plagiarism...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mt-2"></div>
        </div>
      )}
      {!isAnalyzing && overallPlagiarismScore > 0 && (
        <div className="mt-8 p-6 border rounded-lg bg-white dark:bg-gray-900">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">
              Plagiarism Analysis Results
            </h2>
            <div
              className={`text-6xl font-bold ${
                overallPlagiarismScore > 50
                  ? "text-red-600"
                  : overallPlagiarismScore > 25
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {overallPlagiarismScore}%
            </div>
            <p className="text-gray-600 mt-2">Overall Similarity Score</p>
          </div>

          {/* Detailed Results */}
          <div className="space-y-4">
            {plagiarismResults.map((result, index) => (
              <div key={index} className="border rounded p-4">
                <h3 className="font-semibold mb-2">
                  Snippet {result.snippetIndex + 1} - Max Similarity:{" "}
                  {result.maxSimilarity}%
                </h3>
                <p className="text-sm text-gray-600 mb-3 italic">
                  &quot;{result.originalSnippet.substring(0, 100)}...&quot;
                </p>

                {result.sources.map(
                  (source: PlagiarismSource, sourceIndex: number) => (
                    <div
                      key={sourceIndex}
                      className="ml-4 mb-2 p-2 bg-gray-50 rounded"
                    >
                      <div className="flex justify-between items-center">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm font-medium"
                        >
                          {source.title}
                        </a>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            source.similarity > 50
                              ? "bg-red-100 text-red-800"
                              : source.similarity > 25
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {source.similarity}%
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlagiarismChecker;
