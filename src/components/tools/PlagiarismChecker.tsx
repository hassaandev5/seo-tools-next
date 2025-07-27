"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const PlagiarismChecker = () => {
  const [article, setArticle] = useState("");
  const [snippets, setSnippets] = useState<string[]>([]);

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
      return;
    }
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(
        snippet
      )}`
    );
    const data = await response.json();
  };
  const handleCheckPlagiarism = () => {
    if (article.trim() === "") {
      alert("Please enter an article to check for plagiarism.");
      return;
    }
    const snippetList = makeSnippets(article);

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

      {/* Placeholder for results */}
    </div>
  );
};

export default PlagiarismChecker;
