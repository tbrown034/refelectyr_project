// library/utils/recommendationsUtils.js
/**
 * Formats a prompt for the LLM to generate personalized recommendations
 * @param {string} type - 'movie' or 'tv'
 * @param {Array} items - The list of items to base recommendations on
 * @returns {string} Formatted prompt for the LLM
 */
export function formatRecommendationPrompt(type, items) {
  const mediaType = type === "movie" ? "movies" : "TV shows";

  // Get formatted list of titles for the prompt
  let itemsList = items
    .map((item, index) => {
      const title = type === "movie" ? item.title : item.name;
      const year =
        type === "movie"
          ? item.release_date
            ? new Date(item.release_date).getFullYear()
            : "Unknown"
          : item.first_air_date
          ? new Date(item.first_air_date).getFullYear()
          : "Unknown";

      return `${index + 1}. ${title} (${year})`;
    })
    .join("\n");

  // Craft a prompt that will generate well-structured recommendations
  return `Based on this list of ${mediaType}:

  ${itemsList}

  Please recommend 5 similar ${mediaType} that the user might enjoy. For each recommendation:
  1. Include the title and release year in parentheses
  2. Provide a brief explanation of why it matches their taste based on their list
  3. Format your response as follows:

  1. [Title] (Year) - [Reason for recommendation]
  2. [Title] (Year) - [Reason for recommendation]
  ...and so on.

  Focus on ${mediaType} with similar themes, directors, actors, or storytelling styles to those in the user's list. Be specific in your reasoning.`;
}

/**
 * Processes recommendations from LLM response to match TMDB data format
 * @param {Array} recommendations - Raw recommendation data from LLM
 * @param {string} type - 'movie' or 'tv'
 * @returns {Array} Processed recommendations
 */
export function processRecommendations(recommendations, type) {
  return recommendations.map((rec, index) => {
    // Create a structure that resembles TMDB response format
    // but includes recommendation-specific fields
    return {
      id: `rec_${index}`, // Use a placeholder ID format
      [type === "movie" ? "title" : "name"]: rec.title || rec.name,
      [type === "movie" ? "release_date" : "first_air_date"]: rec.year
        ? `${rec.year}-01-01` // Placeholder date using just the year
        : null,
      reason: rec.reason || "Recommended based on your list",
      recommendation: true, // Flag this as a recommendation
      vote_average: 0, // Placeholder
      poster_path: null, // No poster available for recommendations
    };
  });
}
