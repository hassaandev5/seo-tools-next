import { NextRequest, NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
const GOOGLE_CX = process.env.GOOGLE_SEARCH_CX;

export async function POST(request: NextRequest) {
  const { snippet } = await request.json();

  if (!snippet) {
    return NextResponse.json(
      { message: "Snippet is required" },
      { status: 400 }
    );
  }

  if (!GOOGLE_API_KEY || !GOOGLE_CX) {
    return NextResponse.json(
      { message: "Google Search API credentials not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(
        snippet
      )}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching snippets:", error);
    return NextResponse.json(
      { message: "Error searching snippets" },
      { status: 500 }
    );
  }
}
