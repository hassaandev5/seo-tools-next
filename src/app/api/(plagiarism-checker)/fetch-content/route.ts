import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      //   console.error("Failed to fetch URL:", url, response.statusText);
      return NextResponse.json({ error: "Failed to fetch" }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract text content, removing scripts and styles
    $("script, style, nav, header, footer").remove();
    const content = $("body").text().replace(/\s+/g, " ").trim();

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
