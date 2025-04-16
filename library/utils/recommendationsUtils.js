/**
 * Formats a prompt for the LLM to generate personalized recommendations
 * @param {string} type - 'movie' or 'tv'
 * @param {Array} items - The list of items to base recommendations on
 * @returns {string} Formatted prompt for the LLM
 */
export function formatRecommendationPrompt(type, items) {
  // Input validation with helpful error messages
  if (!type || (type !== "movie" && type !== "tv")) {
    throw new Error("Invalid media type. Must be 'movie' or 'tv'");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Items must be a non-empty array");
  }

  const mediaType = type === "movie" ? "movies" : "TV shows";
  const currentYear = new Date().getFullYear();

  // Extract genres from user's list for more targeted recommendations
  const genres = new Set();

  items.forEach((item) => {
    // Collect genres if available
    if (item.genres && Array.isArray(item.genres)) {
      item.genres.forEach((genre) => genres.add(genre.name));
    } else if (item.genre_ids && Array.isArray(item.genre_ids)) {
      // Handle genre IDs from TMDB API responses
      item.genre_ids.forEach((id) => {
        const genreName = getTmdbGenreName(id, type);
        if (genreName) genres.add(genreName);
      });
    }
  });

  // Format the collected metadata for the prompt
  const genresList = Array.from(genres).join(", ");

  // Get formatted list of titles for the prompt
  let itemsList = items
    .map((item, index) => {
      if (!item) return `${index + 1}. Unknown item`;

      const title =
        type === "movie"
          ? item.title || "Unknown title"
          : item.name || "Unknown name";
      const year = (() => {
        try {
          const dateField =
            type === "movie" ? item.release_date : item.first_air_date;
          if (!dateField) return "Unknown year";
          return new Date(dateField).getFullYear().toString();
        } catch (error) {
          return "Unknown year";
        }
      })();

      // Add vote average if available
      const rating = item.vote_average ? ` [Rating: ${item.vote_average}]` : "";

      return `${index + 1}. ${title} (${year})${rating}`;
    })
    .join("\n");

  // Craft a prompt that will generate consistently structured recommendations
  return `You are a personalized ${mediaType} recommendation engine that matches users with titles they'll love.

Based on this list of ${mediaType} the user has added to their list:

${itemsList}

${genresList ? `\nGenres represented: ${genresList}` : ""}

Please recommend 5 different ${mediaType} that are similar to the user's taste. Requirements:

1. ONLY include REAL ${mediaType} released in ${currentYear} or earlier.
2. DO NOT include unreleased, upcoming, or fictional ${mediaType}.
3. DO NOT recommend any titles already in the user's list.
4. Focus on finding genuine connections between the user's favorites.
5. Include both recent and classic ${mediaType} with strong critical reception.
6. Consider directors, themes, storytelling style, and emotional tone.

For each recommendation, provide:
- The exact title as it appears in official databases
- Precise release year (4-digit)
- A brief, specific explanation connecting it to the user's taste
- Mention which of their ${mediaType} it relates to

Format your response as a JSON array with this structure:

[
  {
    "title": "The Exact Movie Title",
    "year": 2018,
    "reason": "This recommendation connects to your interest in [specific titles from their list] because of [specific insights about shared qualities]."
  },
  ...rest of recommendations
]

Emphasize quality and genuine connections over basic similarities.`;
}

/**
 * Maps TMDB genre IDs to their names
 * @param {number} genreId - The TMDB genre ID
 * @param {string} type - 'movie' or 'tv'
 * @returns {string|null} Genre name or null if not found
 */
function getTmdbGenreName(genreId, type) {
  // Common TMDB genre IDs - these are the most frequently used ones
  const genreMap = {
    movie: {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    },
    tv: {
      10759: "Action & Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      10762: "Kids",
      9648: "Mystery",
      10763: "News",
      10764: "Reality",
      10765: "Sci-Fi & Fantasy",
      10766: "Soap",
      10767: "Talk",
      10768: "War & Politics",
      37: "Western",
    },
  };

  return (genreMap[type] && genreMap[type][genreId]) || null;
}

/**
 * Parses recommendations from LLM response
 * @param {string} text - Raw text response from LLM
 * @param {string} type - 'movie' or 'tv'
 * @returns {Array} Processed recommendations
 */
export function parseRecommendations(text, type) {
  if (!text || typeof text !== "string") {
    console.error("Invalid recommendation text received");
    return [];
  }

  const currentYear = new Date().getFullYear();

  try {
    // Try to extract JSON from the response
    let recommendations = [];

    // First attempt: Try to extract a full JSON array
    if (text.includes("[") && text.includes("]")) {
      try {
        // Find the outermost array in the text
        const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/m);
        if (jsonMatch) {
          const jsonText = jsonMatch[0];
          const parsed = JSON.parse(jsonText);

          if (Array.isArray(parsed) && parsed.length > 0) {
            recommendations = parsed;
          }
        }
      } catch (jsonError) {
        console.warn(
          "JSON parsing failed, falling back to text parsing:",
          jsonError.message
        );
      }
    }

    // Second attempt: Fall back to line-by-line parsing if JSON extraction failed
    if (recommendations.length === 0) {
      const lines = text
        .split("\n")
        .filter((line) => line.trim().match(/^\d+\.\s+.+/));

      if (lines.length > 0) {
        recommendations = lines.map((line, index) => {
          // Enhanced regex patterns for better extraction
          const titleMatch = line.match(/^\d+\.\s+([^(]+)/);
          const yearMatch = line.match(/\((\d{4})\)/);
          const reasonMatch = line.match(/(?:-|:)\s+(.+)$/);

          return {
            id: `rec_${index}`, // Generate a placeholder ID
            title:
              type === "movie"
                ? titleMatch
                  ? titleMatch[1].trim()
                  : `Recommendation ${index + 1}`
                : null,
            name:
              type === "tv"
                ? titleMatch
                  ? titleMatch[1].trim()
                  : `Recommendation ${index + 1}`
                : null,
            year: yearMatch ? parseInt(yearMatch[1], 10) : null,
            reason: reasonMatch
              ? reasonMatch[1].trim()
              : "Based on your list preferences",
            recommendation: true, // Flag to identify this as a recommendation
          };
        });
      }
    }

    // Validate and normalize recommendations
    return recommendations
      .filter((rec) => {
        // Filter out recommendations with future years
        const year = rec.year || 0;
        const hasTitle = type === "movie" ? !!rec.title : !!rec.name;

        if (year > currentYear) {
          console.warn(
            `Removed recommendation with future year: ${
              rec.title || rec.name
            } (${year})`
          );
          return false;
        }

        if (!hasTitle) {
          console.warn("Removed recommendation without a valid title");
          return false;
        }

        return true;
      })
      .map((rec, index) => {
        // Create a structure that matches what your TMDB API expects
        return {
          id: `rec_${index}`, // Uses placeholder ID that your TMDB enrichment will replace
          [type === "movie" ? "title" : "name"]:
            type === "movie" ? rec.title : rec.name || rec.title,
          year: rec.year || null,
          reason: rec.reason || "Based on your list preferences",
          recommendation: true,
          fromRecommendation: true,
        };
      });
  } catch (error) {
    console.error("Error parsing recommendations:", error);
    return [];
  }
}
