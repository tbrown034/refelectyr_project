"use server";

import { formatRecommendationPrompt } from "@/library/utils/recommendationsUtils";
import { searchTmdbByTitle } from "@/library/api/tmdb";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

/**
 * Server Action to generate personalized recommendations
 * This replaces the API route for better performance and type safety
 */
export async function generateRecommendations(listId, type, items) {
  try {
    // Validate inputs
    if (!listId || !type || !Array.isArray(items) || items.length === 0) {
      return { error: "Missing or invalid data", recommendations: [] };
    }

    const prompt = formatRecommendationPrompt(type, items);

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const contentType = anthropicRes.headers.get("content-type") || "";

    if (!anthropicRes.ok) {
      const errorText = contentType.includes("application/json")
        ? JSON.stringify(await anthropicRes.json())
        : await anthropicRes.text();

      console.error("[RecommendationsAction] Anthropic API error:", errorText);
      return {
        error: "Failed to get recommendations. Please try again.",
        recommendations: [],
      };
    }

    const data = contentType.includes("application/json")
      ? await anthropicRes.json()
      : {};

    const recommendationsText = data?.content?.[0]?.text ?? "";
    const recommendations = parseRecommendations(recommendationsText, type);

    if (!recommendations.length) {
      console.warn("[RecommendationsAction] No recommendations parsed");
      return { recommendations: [] };
    }

    // Enrich with TMDB data
    const enrichedRecommendations = await Promise.all(
      recommendations.map(async (rec) => {
        try {
          const title = rec.title || rec.name;
          const mediaType = type === "movie" ? "movie" : "tv";
          const tmdbResults = await searchTmdbByTitle(
            title,
            rec.year,
            mediaType
          );

          if (tmdbResults?.length > 0) {
            const bestMatch = tmdbResults[0];
            return {
              ...bestMatch,
              reason: rec.reason,
              fromRecommendation: true,
            };
          }

          return rec;
        } catch (tmdbErr) {
          console.error(
            `[RecommendationsAction] TMDB lookup failed for "${rec.title || rec.name}":`,
            tmdbErr
          );
          return rec;
        }
      })
    );

    return { recommendations: enrichedRecommendations };
  } catch (err) {
    console.error("[RecommendationsAction] Error:", err);
    return {
      error: "Something went wrong while processing recommendations.",
      recommendations: [],
    };
  }
}

/**
 * Parse LLM response into structured recommendations
 */
function parseRecommendations(text, type) {
  try {
    if (text.includes("[") && text.includes("]")) {
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
    }

    const lines = text
      .split("\n")
      .filter((line) => line.trim().match(/^\d+\.\s+.+/));

    return lines.map((line, index) => {
      const titleMatch = line.match(/^\d+\.\s+([^(]+)/);
      const yearMatch = line.match(/\((\d{4})\)/);
      const reasonMatch = line.match(/(?:-|:)\s+(.+)$/);

      return {
        id: `rec_${index}`,
        title:
          type === "movie"
            ? titleMatch?.[1]?.trim() ?? `Movie ${index + 1}`
            : null,
        name:
          type === "tv" ? titleMatch?.[1]?.trim() ?? `Show ${index + 1}` : null,
        year: yearMatch ? parseInt(yearMatch[1]) : null,
        reason: reasonMatch?.[1]?.trim() ?? null,
        recommendation: true,
      };
    });
  } catch (err) {
    console.error("[RecommendationsAction] Parse error:", err);
    return [];
  }
}
