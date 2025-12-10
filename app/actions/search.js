"use server";

import { searchTmdbByTitle } from "@/library/api/tmdb";

const LOG_PREFIX = "[SearchAction]";

/**
 * Server Action to search TMDB for movies or TV shows
 * This replaces the API route for better performance
 */
export async function searchMedia(query, type = "movie", year = null) {
  try {
    if (!query || query.length < 2) {
      return { error: "Query must be at least 2 characters", results: [] };
    }

    console.log(`${LOG_PREFIX} Search: query="${query}", type=${type}, year=${year}`);

    const results = await searchTmdbByTitle(
      query,
      year ? parseInt(year) : null,
      type
    );

    console.log(`${LOG_PREFIX} Found ${results.length} results`);

    return { results };
  } catch (error) {
    console.error(`${LOG_PREFIX} Search error:`, error);
    return { error: "Search failed", results: [] };
  }
}
