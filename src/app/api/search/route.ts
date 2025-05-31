import { NextRequest, NextResponse } from "next/server";
import { getExistingSearch, storeSearchResult } from "@/lib/searchOperations";

// Google search API key and CX
const GOOGLE_API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
const GOOGLE_CX = process.env.GOOGLE_SEARCH_CX;

export async function POST(request: NextRequest) {
  try {
    const { searchTerm } = await request.json();

    if (!searchTerm) {
      return NextResponse.json(
        { error: "Search term is required" },
        { status: 400 }
      );
    }

    const cleanSearchTerm = searchTerm.trim();

    // First check database for existing results
    const existingResult = await getExistingSearch(cleanSearchTerm);

    if (existingResult) {
      console.log(`Returning cached result for: ${cleanSearchTerm}`);
      return NextResponse.json({
        success: true,
        data: {
          title: existingResult.title,
          totalResults: existingResult.totalResults,
          searchTerms: existingResult.searchTerms,
          searchTime: existingResult.searchTime,
        },
        cached: true,
        cachedAt: existingResult.createdAt,
      });
    }

    // If not in database, call Google Search API
    console.log(`Making new API call for: ${cleanSearchTerm}`);

    if (!GOOGLE_API_KEY || !GOOGLE_CX) {
      return NextResponse.json(
        { error: "Google Search API credentials not configured" },
        { status: 500 }
      );
    }

    // If not in database, call Google Search API
    const googleUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(
      cleanSearchTerm
    )}`;

    const response = await fetch(googleUrl);

    if (!response.ok) {
      throw new Error("Google Search API request failed");
    }

    const data = await response.json();

    // Extract the fields you want to store
    const searchData = {
      title: data.queries?.request?.[0]?.title || "",
      totalResults: data.searchInformation?.totalResults || "0",
      searchTerms: data.queries?.request?.[0]?.searchTerms || searchTerm,
      searchTime: data.searchInformation?.searchTime || 0,
    };

    // Store in database here
    try {
      const insertId = await storeSearchResult(searchData);
      console.log(`Stored search result with ID: ${insertId}`);
    } catch (dbError) {
      console.error("Database storage error:", dbError);
      // Continue even if DB storage fails, return the API result
    }
    // For now, just return the data
    return NextResponse.json({
      success: true,
      data: searchData,
      // fullResponse: data, // Include full response for now
      cached: false,
      apiCall: true,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
