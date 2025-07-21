import { Metadata } from "next";
import WordCount from "@/components/tools/WordCount";

export const metadata: Metadata = {
  title: "Word Counter - Free Online Word and Character Count Tool",
  description:
    "Count words, characters, sentences, and paragraphs with our free online word counter tool. Perfect for writers, students, and SEO professionals.",
  keywords:
    "word counter, character count, word count tool, free word counter, online text analyzer, text length checker, SEO word count",
};

export default function WordCountPage() {
  return <WordCount />;
}
