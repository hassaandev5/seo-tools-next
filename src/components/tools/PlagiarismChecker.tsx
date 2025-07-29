"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const PlagiarismChecker = () => {
  const [article, setArticle] = useState("");
  const [, setSnippets] = useState<string[]>([]);
  type SearchResult = {
    snippetIndex: number;
    originalSnippet: string;
    searchResults: {
      title: string;
      link: string;
      snippet: string;
      displayLink: string;
    }[];
    totalResults: number;
  };

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY;
  const GOOGLE_CX = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CX;

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
    if (!GOOGLE_API_KEY || !GOOGLE_CX) {
      console.error("Google Search API credentials not configured");
      return null;
    }
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(
          snippet
        )}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);
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
          searchResults: result.items.map((item: any) => ({
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
    const snippetList = makeSnippets(article);
    if (!snippetList) return; // Early return if article is too long

    // Process all snippets
    await processAllSnippets(snippetList);

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
          {/* Results Section */}
          {isSearching && (
            <div className="text-center py-4">
              <p className="text-gray-600">
                Searching for potential matches...
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mt-2"></div>
            </div>
          )}

          {searchResults.length > 0 && (
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
                    Snippet {result.snippetIndex + 1} ({result.totalResults}{" "}
                    total results)
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 italic">
                    "{result.originalSnippet.substring(0, 100)}..."
                  </p>
                  <div className="space-y-2">
                    {result.searchResults
                      .slice(0, 3)
                      .map((item: any, itemIndex: number) => (
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
          )}
        </div>
      </div>

      {/* Placeholder for results */}
    </div>
  );
};

export default PlagiarismChecker;
