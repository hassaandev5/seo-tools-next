"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import {
  FaEdit,
  FaDownload,
  FaCopy,
  FaTrash,
  FaPrint,
  FaFileExport,
  FaCheck,
  FaSave,
  FaUndo,
  FaFont,
  FaTextHeight,
  FaAlignLeft,
} from "react-icons/fa";
import type { Editor as TinyMCEEditor } from "tinymce";

// Dynamically import TinyMCE Editor to avoid SSR issues
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="h-[600px] flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">
            Loading editor...
          </div>
        </div>
      </div>
    ),
  }
);

const OnlineTextEditor: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  // Get theme from next-themes
  const { theme, resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string>("light");

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true);

    // Set initial theme
    const isDark =
      document.documentElement.classList.contains("dark") ||
      resolvedTheme === "dark" ||
      theme === "dark";
    setCurrentTheme(isDark ? "dark" : "light");
  }, [theme, resolvedTheme]);

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const isDark = document.documentElement.classList.contains("dark");
          const newTheme = isDark ? "dark" : "light";

          if (newTheme !== currentTheme) {
            setCurrentTheme(newTheme);

            // Update TinyMCE theme
            if (editorRef.current) {
              updateEditorTheme(editorRef.current, isDark);
            }
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [currentTheme]);

  // Function to update editor theme
  const updateEditorTheme = (editor: TinyMCEEditor, isDark: boolean) => {
    if (!editor) return;

    // Update content styles
    const contentDocument = editor.getDoc();
    if (contentDocument) {
      const body = contentDocument.body;
      if (isDark) {
        body.style.backgroundColor = "#1f2937";
        body.style.color = "#f9fafb";
      } else {
        body.style.backgroundColor = "#ffffff";
        body.style.color = "#000000";
      }
    }

    // Update editor container
    const container = editor.getContainer();
    if (container) {
      if (isDark) {
        container.classList.add("tox-dark-mode");
      } else {
        container.classList.remove("tox-dark-mode");
      }
    }
  };

  // Calculate word and character count
  const updateCounts = (content: string) => {
    const textContent = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    setCharCount(textContent.length);
    setWordCount(
      textContent.trim() ? textContent.trim().split(/\s+/).length : 0
    );
  };

  // Handle editor content change
  const handleEditorChange = (content: string) => {
    setContent(content);
    updateCounts(content);
  };

  // Copy content to clipboard
  const copyToClipboard = async () => {
    if (!content) return;

    try {
      const textContent = content.replace(/<[^>]*>/g, "");
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Download as HTML file
  const downloadAsHTML = () => {
    if (!content) return;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;

    const element = document.createElement("a");
    const file = new Blob([htmlContent], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "document.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Download as text file
  const downloadAsText = () => {
    if (!content) return;

    const textContent = content.replace(/<[^>]*>/g, "");
    const element = document.createElement("a");
    const file = new Blob([textContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "document.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Print document
  const printDocument = () => {
    if (!content) return;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Document</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>${content}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Save to local storage
  const saveToLocalStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("textEditorContent", content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  // Load from local storage
  const loadFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const savedContent = localStorage.getItem("textEditorContent");
      if (savedContent) {
        setContent(savedContent);
        updateCounts(savedContent);
        if (editorRef.current) {
          editorRef.current.setContent(savedContent);
        }
      }
    }
  };

  // Clear editor
  const clearEditor = () => {
    setContent("");
    setWordCount(0);
    setCharCount(0);
    if (editorRef.current) {
      editorRef.current.setContent("");
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mr-4">
              <FaEdit className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Online Text Editor
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create and format professional documents with our feature-rich
            online text editor. Includes formatting tools, spell check, and
            export options.
          </p>
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 mb-6 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={saveToLocalStorage}
                className="btn btn-secondary btn-sm btn-icon-left"
                disabled={!content.trim()}
              >
                {saved ? <FaCheck /> : <FaSave />}
                {saved ? "Saved!" : "Save"}
              </button>
              <button
                onClick={loadFromLocalStorage}
                className="btn btn-outline btn-sm btn-icon-left"
              >
                <FaUndo />
                Load
              </button>
              <button
                onClick={copyToClipboard}
                className="btn btn-outline btn-sm btn-icon-left"
                disabled={!content.trim()}
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={clearEditor}
                className="btn btn-ghost btn-sm btn-icon-left"
                disabled={!content.trim()}
              >
                <FaTrash />
                Clear
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={printDocument}
                className="btn btn-outline btn-sm btn-icon-left"
                disabled={!content.trim()}
              >
                <FaPrint />
                Print
              </button>
              <div className="relative">
                <button className="btn btn-primary btn-sm btn-icon-left group">
                  <FaDownload />
                  Export
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <button
                    onClick={downloadAsHTML}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
                    disabled={!content.trim()}
                  >
                    Download as HTML
                  </button>
                  <button
                    onClick={downloadAsText}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
                    disabled={!content.trim()}
                  >
                    Download as Text
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Editor Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
              {isClient && (
                <Editor
                  key={currentTheme}
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                  onInit={(evt, editor) => {
                    editorRef.current = editor;
                    // Apply initial theme
                    updateEditorTheme(editor, currentTheme === "dark");
                  }}
                  value={content}
                  onEditorChange={handleEditorChange}
                  init={{
                    height: 600,
                    menubar: true,
                    // Only free plugins - no premium features
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "help",
                      "wordcount",
                      "emoticons",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help | fullscreen | preview | code",
                    // Dynamic skin based on theme
                    skin: currentTheme === "dark" ? "oxide-dark" : "oxide",
                    content_css: currentTheme === "dark" ? "dark" : "default",

                    content_style:
                      currentTheme === "dark"
                        ? "body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; background-color: #1f2937; color: #f9fafb; }"
                        : "body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; background-color: #ffffff; color: #000000; }",
                    branding: false, // Remove "Powered by TinyMCE"
                    elementpath: false,
                    resize: false,
                    statusbar: true,
                    paste_data_images: true,
                    automatic_uploads: false,
                    file_picker_types: "image",
                    promotion: false, // Hide upgrade prompts
                    setup: (editor: TinyMCEEditor) => {
                      editor.on("init", () => {
                        // Apply dark mode styles if needed
                        if (
                          typeof window !== "undefined" &&
                          document.documentElement.classList.contains("dark")
                        ) {
                          editor.dom.addStyle(`
                            body { background-color: #1f2937; color: #f9fafb; }
                          `);
                        }
                      });
                    },
                  }}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Stats */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Document Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Words:
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {wordCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Characters:
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {charCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Reading Time:
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {Math.ceil(wordCount / 200)} min
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => editorRef.current?.execCommand("Bold")}
                  className="btn btn-outline btn-sm btn-full btn-icon-left"
                >
                  <FaFont />
                  Bold Selection
                </button>
                <button
                  onClick={() => editorRef.current?.execCommand("Italic")}
                  className="btn btn-outline btn-sm btn-full btn-icon-left"
                >
                  <FaTextHeight />
                  Italic Selection
                </button>
                <button
                  onClick={() => editorRef.current?.execCommand("JustifyLeft")}
                  className="btn btn-outline btn-sm btn-full btn-icon-left"
                >
                  <FaAlignLeft />
                  Align Left
                </button>
                <button
                  onClick={() =>
                    editorRef.current?.execCommand("InsertHorizontalRule")
                  }
                  className="btn btn-outline btn-sm btn-full"
                >
                  Insert Line
                </button>
              </div>
            </div>

            {/* Templates */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Quick Templates
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const template = `<h1>Document Title</h1><p>Start writing your document here...</p>`;
                    editorRef.current?.setContent(template);
                    setContent(template);
                    updateCounts(template);
                  }}
                  className="btn btn-ghost btn-sm btn-full text-left"
                >
                  Basic Document
                </button>
                <button
                  onClick={() => {
                    const template = `<h1>Meeting Notes</h1><h2>Date: ${new Date().toLocaleDateString()}</h2><h3>Attendees:</h3><ul><li>Name 1</li><li>Name 2</li></ul><h3>Agenda:</h3><ol><li>Item 1</li><li>Item 2</li></ol><h3>Action Items:</h3><ul><li>Task 1</li><li>Task 2</li></ul>`;
                    editorRef.current?.setContent(template);
                    setContent(template);
                    updateCounts(template);
                  }}
                  className="btn btn-ghost btn-sm btn-full text-left"
                >
                  Meeting Notes
                </button>
                <button
                  onClick={() => {
                    const template = `<h1>Article Title</h1><p><strong>Introduction:</strong> Brief overview of the topic...</p><h2>Main Content</h2><p>Your main content goes here...</p><h2>Conclusion</h2><p>Summarize your key points...</p>`;
                    editorRef.current?.setContent(template);
                    setContent(template);
                    updateCounts(template);
                  }}
                  className="btn btn-ghost btn-sm btn-full text-left"
                >
                  Article Template
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Editor Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mr-4">
                  <FaEdit className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Rich Formatting
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Full formatting options including fonts, colors, lists, tables,
                and more.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mr-4">
                  <FaFileExport className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Export Options
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Export your documents as HTML, plain text, or print directly
                from the editor.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mr-4">
                  <FaSave className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Auto Save
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Save your work locally and continue editing later without losing
                progress.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mr-4">
                  <FaFont className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Templates
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Start quickly with pre-built templates for documents, notes, and
                articles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineTextEditor;
