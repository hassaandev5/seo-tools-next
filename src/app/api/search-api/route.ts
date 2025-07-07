import { NextRequest, NextResponse } from "next/server";
import {
  getExistingCustomSearch,
  storeCustomSearchResult,
} from "@/lib/customSearchOperations";
import { extractKeywords } from "@/lib/keywordExtraction";

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
    const existingResult = await getExistingCustomSearch(cleanSearchTerm);

    if (existingResult) {
      console.log(`Returning cached result for: ${cleanSearchTerm}`);

      // Calculate basic stats from cached keywords
      const keywordCount = Object.keys(existingResult.keywords).length;
      const totalOccurrences = Object.values(existingResult.keywords).reduce(
        (sum: number, keyword: any) => sum + keyword.count,
        0
      );

      return NextResponse.json({
        success: true,
        data: {
          title: `Search results for "${cleanSearchTerm}"`,
          totalResults: totalOccurrences.toString(),
          searchTerms: cleanSearchTerm,
          searchTime: 0.001, // Cached, so very fast
          cached: true,
          cachedAt: existingResult.created_at,
          keywords: existingResult.keywords,
          keywordCount: keywordCount,
        },
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

    // Call Google Search API
    const googleUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(
      cleanSearchTerm
    )}&num=10`; // Get 10 results for better keyword extraction

    const response = await fetch(googleUrl);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Google Search API request failed"
      );
    }

    const data = await response.json();
    console.log(data);

    // Extract keywords from the search response
    const extractedKeywords = extractKeywords(data);

    // Prepare data for storage
    const searchData = {
      search_query: cleanSearchTerm,
      keywords: extractedKeywords,
      url: googleUrl,
    };

    // Extract basic search information
    const searchInfo = {
      title:
        data.queries?.request?.[0]?.title ||
        `Search results for "${cleanSearchTerm}"`,
      totalResults: data.searchInformation?.totalResults || "0",
      searchTerms: cleanSearchTerm,
      searchTime: data.searchInformation?.searchTime || 0,
      keywords: extractedKeywords,
      keywordCount: Object.keys(extractedKeywords).length,
    };

    // Store in database
    try {
      const insertId = await storeCustomSearchResult(searchData);
      console.log(`Stored custom search result with ID: ${insertId}`);
    } catch (dbError) {
      console.error("Database storage error:", dbError);
      // Continue even if DB storage fails, return the API result
    }

    return NextResponse.json({
      success: true,
      data: searchInfo,
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
