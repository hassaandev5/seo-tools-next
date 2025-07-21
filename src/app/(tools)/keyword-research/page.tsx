import { Metadata } from "next";
import KeywordSearch from "@/components/tools/KeywordSearch";

export const metadata: Metadata = {
  title: "Keyword Search - Free Online Keyword Search Tool",
  description:
    "Find the best SEO keywords with our free keyword search tool. Discover high-volume, low-competition keywords to boost your website traffic.",
  keywords:
    "keyword search, SEO keyword tool, keyword finder, keyword analyzer, free SEO tool, keyword research, SEO optimization",
};

export default function Page() {
  return (
    <div>
      <KeywordSearch />
    </div>
  );
}
