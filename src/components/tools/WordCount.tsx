"use client"
import React, { useState } from "react";
import {
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

const WordCount: React.FC = () => {
  const [text, setText] = useState("");
  const [analysisResult, setAnalysisResult] = useState({
    words: 0,
    characters: 0,
    characterWithoutSpaces: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  const analyzeText = (inputText: string) => {
    // Trim to remove leading and trailing whitespace
    const trimmedText = inputText.trim();

    // Word count (split by whitespace, filter out empty strings)
    const words = trimmedText.length > 0 
      ? trimmedText.split(/\s+/).filter(word => word.length > 0).length 
      : 0;

    // Character count (including spaces)
    const characters = inputText.length;

    // Character count (without spaces)
    const characterWithoutSpaces = inputText.replace(/\s/g, '').length;

    // Paragraph count (split by double newline or multiple newlines)
    const paragraphs = trimmedText.length > 0 
      ? trimmedText.split(/\n\s*\n/).filter(para => para.trim().length > 0).length 
      : 0;

    // Rough reading time calculation (200 words per minute)
    const readingTime = Math.ceil(words / 200);

    setAnalysisResult({
      words,
      characters,
      characterWithoutSpaces,
      paragraphs,
      readingTime,
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    setText(inputText);
    analyzeText(inputText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Text copied to clipboard!');
    });
  };

  const clearText = () => {
    setText('');
    setAnalysisResult({
      words: 0,
      characters: 0,
      characterWithoutSpaces: 0,
      paragraphs: 0,
      readingTime: 0,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Word Count Tool
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Analyze your text with detailed metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Text Input Section */}
        <div className="textarea-container">
          <div className="textarea-label-container">
            <label htmlFor="word-count-textarea" className="textarea-label">
              Enter Your Text
            </label>
            <div className="flex space-x-2">
              <button 
                onClick={copyToClipboard}
                className="btn btn-ghost btn-sm"
              >
                Copy
              </button>
              <button 
                onClick={clearText}
                className="btn btn-ghost btn-sm"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="relative">
            <textarea
              id="word-count-textarea"
              rows={10}
              placeholder="Start typing or paste your text here..."
              className="textarea textarea-auto-grow"
              value={text}
              onChange={handleTextChange}
              style={{ maxHeight: "300px" }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(
                  target.scrollHeight,
                  300
                )}px`;
              }}
            ></textarea>
          </div>
          <p className="textarea-helper-text">
            This textarea will automatically expand as you type
          </p>
        </div>

        {/* Analysis Results Section */}
        <div className="space-y-6">
          {/* Word Count Analysis */}
          <div className="textarea-container">
            <label className="textarea-label flex items-center">
              <FaChartLine className="mr-2 textarea-icon textarea-icon-success" />
              Text Analysis
            </label>
            
            <div className="rounded-lg border p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Words</p>
                  <p className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                    {analysisResult.words}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Characters</p>
                  <p className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                    {analysisResult.characters}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Paragraphs</p>
                  <p className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                    {analysisResult.paragraphs}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Reading Time</p>
                  <p className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                    {analysisResult.readingTime} min
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Character Count Analysis */}
          <div className="textarea-container">
            <label className="textarea-label flex items-center">
              <FaChartLine className="mr-2 textarea-icon textarea-icon-success" />
              Character Count
            </label>
            
            <div className="rounded-lg border p-4 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">With Spaces</p>
                  <p className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
                    {analysisResult.characters}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Without Spaces</p>
                  <p className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
                    {analysisResult.characterWithoutSpaces}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {text.length > 0 && (
            <div className="textarea-container">
              <label className="textarea-label flex items-center text-amber-800 dark:text-amber-300">
                <FaExclamationTriangle className="mr-2 textarea-icon textarea-icon-warning" />
                Writing Tips
              </label>
              
              <div className="rounded-lg border p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-400 dark:border-amber-700">
                {analysisResult.words < 50 && (
                  <p className="text-sm text-amber-800 dark:text-amber-300 flex items-center">
                    <FaExclamationTriangle className="mr-2 text-amber-500" />
                    Consider expanding your text for more depth
                  </p>
                )}
                {analysisResult.words > 500 && (
                  <p className="text-sm text-amber-800 dark:text-amber-300 flex items-center">
                    <FaExclamationTriangle className="mr-2 text-amber-500" />
                    Your text is quite long. Consider breaking it into sections
                  </p>
                )}
                {analysisResult.words >= 50 && analysisResult.words <= 500 && (
                  <p className="text-sm text-emerald-800 dark:text-emerald-300 flex items-center">
                    <FaCheckCircle className="mr-2 text-emerald-500" />
                    Great text length! Your content looks well-balanced
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordCount;