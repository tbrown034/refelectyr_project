// app/api/recommendations/route.js
import { NextResponse } from "next/server";
import { formatRecommendationPrompt } from "@/library/utils/recommendationsUtils";
import { searchTmdbByTitle } from "@/library/api/tmdb";

// Replace with your actual API key (use environment variables)
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function POST(request) {
  try {
    // Parse the request body
    const { listId, type, items } = await request.json();

    if (!listId || !type || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required data" },
        { status: 400 }
      );
    }

    // Format the prompt for the LLM
    const prompt = formatRecommendationPrompt(type, items);

    // Call the Anthropic API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("LLM API error:", error);
      return NextResponse.json(
        { error: "Failed to get recommendations" },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Extract recommendations from the LLM response
    const recommendationsText = data.content[0].text;
    const recommendations = parseRecommendations(recommendationsText, type);

    // Enrich recommendations with TMDB data
    const enrichedRecommendations = await Promise.all(
      recommendations.map(async (rec) => {
        // Get the title to search for
        const searchTitle = rec.title || rec.name;
        const searchYear = rec.year;

        // Search TMDB for this title
        const mediaType = type === "movie" ? "movie" : "tv";
        const tmdbResults = await searchTmdbByTitle(
          searchTitle,
          searchYear,
          mediaType
        );

        // If we found a match, combine it with our recommendation reason
        if (tmdbResults && tmdbResults.length > 0) {
          const bestMatch = tmdbResults[0]; // Use the first (best) match
          return {
            ...bestMatch,
            reason: rec.reason, // Keep the recommendation reason
            fromRecommendation: true, // Flag to identify as a recommendation
          };
        }

        // If no match, return the original recommendation
        return rec;
      })
    );

    return NextResponse.json({ recommendations: enrichedRecommendations });
  } catch (error) {
    console.error("Recommendation error:", error);
    return NextResponse.json(
      { error: "Failed to process recommendation request" },
      { status: 500 }
    );
  }
}

// Helper function to parse recommendations from LLM text response
function parseRecommendations(text, type) {
  // [existing parseRecommendations function]
  try {
    // Check if the response contains a JSON array
    if (text.includes("[") && text.includes("]")) {
      // Try to extract JSON
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }

    // Fallback: extract recommendations by line
    // Assuming each recommendation is on a separate line
    // and follows a pattern like "1. Movie Title (Year) - Reason"
    const lines = text
      .split("\n")
      .filter((line) => line.trim().match(/^\d+\.\s+.+/));

    return lines.map((line, index) => {
      // Parse the line to extract title, year, and reason
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
        year: yearMatch ? parseInt(yearMatch[1]) : null,
        reason: reasonMatch ? reasonMatch[1].trim() : null,
        recommendation: true, // Flag to identify this as a recommendation
      };
    });
  } catch (error) {
    console.error("Error parsing recommendations:", error);
    return [];
  }
}
