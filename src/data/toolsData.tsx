import { JSX } from "react";
import {
  FaSearch,
  FaCalculator,
  FaKeyboard,
  FaRegFileImage,
  FaEdit,
  FaFingerprint,
} from "react-icons/fa";

// Tool type definition
export interface Tool {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  category: string;
  slug: string;
  isPopular?: boolean;
}

// Categories data
export const categories = [
  { id: "all", name: "All Tools" },
  { id: "content", name: "Content" },
  { id: "research", name: "Research" },
  { id: "technical", name: "Technical" },
  { id: "analytics", name: "Analytics" },
];

// Tools data
export const tools: Tool[] = [
  {
    id: 1,
    title: "Plagiarism Checker",
    description:
      "Verify your content's originality against billions of web pages and ensure it's unique.",
    icon: <FaSearch className="w-5 h-5" />,
    category: "content",
    slug: "plagiarism-checker",
    isPopular: true,
  },

  {
    id: 2,
    title: "Case Converter",
    description:
      "Change Text Case Just paste your text and change the case according to your needs",
    icon: <FaRegFileImage className="w-5 h-5" />,
    category: "content",
    slug: "case-converter",
  },
  {
    id: 3,
    title: "Online Text Editor",
    description:
      "Rich text editor with formatting options, spell check, and export capabilities for creating professional documents.",
    icon: <FaEdit className="w-5 h-5" />,
    category: "content",
    slug: "online-text-editor",
    isPopular: true,
  },
  {
    id: 4,
    title: "Keyword Research",
    description:
      "Discover high-performing keywords to target in your content strategy.",
    icon: <FaKeyboard className="w-5 h-5" />,
    category: "research",
    slug: "keyword-research",
  },
  {
    id: 5,
    title: "MD5 Generator",
    description:
      "Generate the MD5 hash of any string instantly for security or verification purposes.",
    icon: <FaFingerprint className="w-5 h-5" />,
    category: "technical",
    slug: "md5-generator",
    isPopular: true,
  },
  {
    id: 6,
    title: "Words Count",
    description:
      "Count words, characters, sentences and estimate reading time for your content.",
    icon: <FaCalculator className="w-5 h-5" />,
    category: "content",
    slug: "word-count",
    isPopular: true,
  },
];
