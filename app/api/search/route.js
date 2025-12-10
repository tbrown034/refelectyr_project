import { NextResponse } from "next/server";
import { searchTmdbByTitle } from "@/library/api/tmdb";

const LOG_PREFIX = "[API/search]";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const type = searchParams.get("type") || "movie";
    const year = searchParams.get("year");

    console.log(`${LOG_PREFIX} Search request: query="${query}", type=${type}, year=${year}`);

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: "Query must be at least 2 characters" },
        { status: 400 }
      );
    }

    const results = await searchTmdbByTitle(
      query,
      year ? parseInt(year) : null,
      type
    );

    console.log(`${LOG_PREFIX} Found ${results.length} results`);

    return NextResponse.json({ results });
  } catch (error) {
    console.error(`${LOG_PREFIX} Search error:`, error);
    return NextResponse.json(
      { error: "Search failed", details: error.message },
      { status: 500 }
    );
  }
}
