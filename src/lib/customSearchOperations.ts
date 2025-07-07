// src\lib\customSearchOperations.ts
import { pool } from "./db";
import { RowDataPacket } from "mysql2";

export type KeywordInfo = { count: number; density: number; wordCount: number };
export type KeywordsMap = Record<string, KeywordInfo>;

export interface CustomSearchResult {
  id?: number;
  search_query: string;
  keywords: KeywordsMap; // JSON object
  url?: string;
  created_at?: Date;
}

// Check if search query already exists in database
export async function getExistingCustomSearch(
  searchQuery: string
): Promise<CustomSearchResult | null> {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT id, search_query, keywords, url, created_at FROM custom_search WHERE search_query = ? ORDER BY created_at DESC LIMIT 1",
      [searchQuery.toLowerCase().trim()]
    );

    if (rows.length > 0) {
      // Parse the JSON string back to an object
      let parsedKeywords: KeywordsMap;
      try {
        parsedKeywords =
          typeof rows[0].keywords === "string"
            ? JSON.parse(rows[0].keywords)
            : rows[0].keywords;
      } catch (parseError) {
        console.error("Error parsing keywords JSON:", parseError);
        parsedKeywords = {};
      }

      return {
        id: rows[0].id,
        search_query: rows[0].search_query,
        keywords: parsedKeywords,
        url: rows[0].url,
        created_at: rows[0].created_at,
      };
    }

    return null;
  } catch (error) {
    console.error("Error checking existing custom search:", error);
    throw error;
  }
}

// Store new custom search result in database
export async function storeCustomSearchResult(
  searchData: CustomSearchResult
): Promise<number> {
  try {
    const [result] = await pool.execute<import("mysql2").ResultSetHeader>(
      "INSERT INTO custom_search (search_query, keywords, url) VALUES (?, ?, ?)",
      [
        searchData.search_query.toLowerCase().trim(),
        JSON.stringify(searchData.keywords),
        searchData.url || null,
      ]
    );

    return result.insertId;
  } catch (error) {
    console.error("Error storing custom search result:", error);
    throw error;
  }
}

// Get all custom search results
export async function getAllCustomSearchResults(): Promise<
  CustomSearchResult[]
> {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT id, search_query, keywords, url, created_at FROM custom_search ORDER BY created_at DESC"
    );

    return rows.map((row) => {
      // Parse the JSON string back to an object
      let parsedKeywords: KeywordsMap;
      try {
        parsedKeywords =
          typeof row.keywords === "string"
            ? JSON.parse(row.keywords)
            : row.keywords;
      } catch (parseError) {
        console.error("Error parsing keywords JSON:", parseError);
        parsedKeywords = {};
      }

      return {
        id: row.id,
        search_query: row.search_query,
        keywords: parsedKeywords,
        url: row.url,
        created_at: row.created_at,
      };
    });
  } catch (error) {
    console.error("Error fetching custom search results:", error);
    throw error;
  }
}
