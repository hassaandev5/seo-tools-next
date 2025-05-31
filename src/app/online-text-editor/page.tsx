import { Metadata } from "next";
import OnlineTextEditor from "@/components/OnlineTextEditor";

export const metadata: Metadata = {
  title: "Online Text Editor - Free Rich Text Editor with Formatting",
  description:
    "Free online text editor with rich formatting options, spell check, word count, and export capabilities. Create professional documents online.",
  keywords:
    "online text editor, rich text editor, document editor, text formatting, word processor, online writing tool",
};

export default function OnlineTextEditorPage() {
  return (
    <div>
      <OnlineTextEditor />
    </div>
  );
}
