import { pool } from "./db";
import { RowDataPacket } from "mysql2";

export interface SearchResult {
  id?: number;
  title: string;
  totalResults: string;
  searchTerms: string;
  searchTime: number;
  createdAt?: Date;
}

// Check if search term already exists in database
export async function getExistingSearch(
  searchTerm: string
): Promise<SearchResult | null> {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT id, title, total_results as totalResults, search_terms as searchTerms, search_time as searchTime, created_at as createdAt FROM search WHERE search_terms = ? ORDER BY created_at DESC LIMIT 1",
      [searchTerm.toLowerCase().trim()]
    );

    if (rows.length > 0) {
      return {
        id: rows[0].id,
        title: rows[0].title,
        totalResults: rows[0].totalResults,
        searchTerms: rows[0].searchTerms,
        searchTime: parseFloat(rows[0].searchTime) || 0,
        createdAt: rows[0].createdAt,
      };
    }

    return null;
  } catch (error) {
    console.error("Error checking existing search:", error);
    throw error;
  }
}

// Store new search result in database
export async function storeSearchResult(
  searchData: SearchResult
): Promise<number> {
  try {
    const [result] = await pool.execute(
      "INSERT INTO search (title, total_results, search_terms, search_time) VALUES (?, ?, ?, ?)",
      [
        searchData.title,
        searchData.totalResults,
        searchData.searchTerms.toLowerCase().trim(),
        searchData.searchTime,
      ]
    );

    return (result as any).insertId;
  } catch (error) {
    console.error("Error storing search result:", error);
    throw error;
  }
}
