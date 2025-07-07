interface KeywordDensity {
  [keyword: string]: {
    count: number;
    density: number;
    wordCount: number;
  };
}

interface GoogleSearchItem {
  title?: string;
  snippet?: string;
  displayLink?: string;
}

interface GoogleSearchQuery {
  searchTerms?: string;
  title?: string;
}

interface GoogleSearchResponse {
  items?: GoogleSearchItem[];
  queries?: {
    request?: GoogleSearchQuery[];
    nextPage?: GoogleSearchQuery[];
    previousPage?: GoogleSearchQuery[];
    [key: string]: GoogleSearchQuery[] | undefined;
  };
  [key: string]: unknown;
}

export function extractKeywords(
  searchResponse: GoogleSearchResponse
): KeywordDensity {
  const text = extractTextFromResponse(searchResponse);
  const words = processText(text);

  // Get n-grams (1-4 words)
  const allNGrams = [
    ...getNGrams(words, 1), // single words
    ...getNGrams(words, 2), // 2-word phrases
    ...getNGrams(words, 3), // 3-word phrases
    ...getNGrams(words, 4), // 4-word phrases
  ];

  const keywordCounts = countKeywords(allNGrams);
  const totalWords = words.length;

  // Calculate density and filter keywords that appear more than once
  const keywordDensity: KeywordDensity = {};

  for (const [keyword, count] of Object.entries(keywordCounts)) {
    if (count > 1) {
      // Only include repeating keywords
      const wordCount = keyword.split(" ").length;
      keywordDensity[keyword] = {
        count: count,
        density: parseFloat(((count / totalWords) * 100).toFixed(2)),
        wordCount: wordCount,
      };
    }
  }

  return keywordDensity;
}

// New function to generate n-grams
function getNGrams(words: string[], n: number): string[] {
  const nGrams: string[] = [];

  for (let i = 0; i <= words.length - n; i++) {
    const nGram = words.slice(i, i + n).join(" ");
    nGrams.push(nGram);
  }

  return nGrams;
}

function extractTextFromResponse(searchResponse: GoogleSearchResponse): string {
  let combinedText = "";

  // Extract text from search results
  if (searchResponse.items && Array.isArray(searchResponse.items)) {
    searchResponse.items.forEach((item: GoogleSearchItem) => {
      if (item.title) combinedText += " " + item.title;
      if (item.snippet) combinedText += " " + item.snippet;
      if (item.displayLink) combinedText += " " + item.displayLink;
    });
  }

  // Extract text from queries
  if (searchResponse.queries) {
    (["request", "nextPage", "previousPage"] as const).forEach((queryType) => {
      if (searchResponse.queries?.[queryType]) {
        searchResponse.queries[queryType]?.forEach(
          (query: GoogleSearchQuery) => {
            if (query.searchTerms) combinedText += " " + query.searchTerms;
            if (query.title) combinedText += " " + query.title;
          }
        );
      }
    });
  }

  return combinedText;
}

function processText(text: string): string[] {
  // Convert to lowercase and remove special characters
  const cleanText = text.toLowerCase().replace(/[^\w\s]/g, " ");

  // Split into words and filter out common stop words and short words
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "must",
    "can",
    "this",
    "that",
    "these",
    "those",
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "me",
    "him",
    "her",
    "us",
    "them",
    "my",
    "your",
    "his",
    "her",
    "its",
    "our",
    "their",
    "from",
    "as",
    "so",
    "if",
    "when",
    "where",
    "how",
    "what",
    "why",
    "who",
  ]);

  return cleanText
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word))
    .filter((word) => !word.match(/^\d+$/)); // Remove pure numbers
}

function countKeywords(keywords: string[]): Record<string, number> {
  const counts: Record<string, number> = {};

  keywords.forEach((keyword) => {
    counts[keyword] = (counts[keyword] || 0) + 1;
  });

  return counts;
}
