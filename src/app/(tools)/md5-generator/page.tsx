import { Metadata } from "next";
import MD5Generator from "@/app/(tools)/md5-generator/MD5Generator";

export const metadata: Metadata = {
  title: "MD5 Generator - Free Online MD5 Hash Generator Tool",
  description:
    "Generate the MD5 hash of any string instantly for security or verification purposes. Use our free online MD5 generator tool.",
  keywords:
    "MD5 generator, MD5 hash, online MD5 tool, free MD5 generator, string hash, security tool, verification tool",
};

export default function Page() {
  return (
    <div>
      <MD5Generator />
    </div>
  );
}
