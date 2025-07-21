import { Metadata } from "next";
import CaseConvertor from "@/components/tools/CaseConverter";

export const metadata: Metadata = {
  title: "Case Convertor - Free Online Text Case Converter Tool",
  description:
    "Convert text to uppercase, lowercase, sentence case, toggle case, and alternating case. Free online text case converter tool.",
  keywords:
    "case converter, text converter, uppercase, lowercase, sentence case, toggle case, alternating case",
};

export default function CaseConvertorPage() {
  return (
    <div>
      <CaseConvertor />
    </div>
  );
}
