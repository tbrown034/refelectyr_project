// library/api/tmdb.js
// 3/11/7:54 p.m. update works in prod
export const getMovies = async ({
  year = null,
  sortBy = "popularity.desc",
  includeAdult = false,
  includeVideo = false,
  language = "en-US",
  limit = 20, // Default to 20 movies
} = {}) => {
  // Match the variable name in your .env.local file
  const token = process.env.TMDB_API_TOKEN;

  const queryParams = new URLSearchParams({
    include_adult: includeAdult,
    include_video: includeVideo,
    language,
    sort_by: sortBy,
    with_original_language: "en", // Focus on English-language content
    "vote_count.gte": 100, // Ensure sufficient votes for meaningful ratings
  });

  if (year) {
    queryParams.append("primary_release_year", year); // Adds year filter if provided
  }

  const url = `https://api.themoviedb.org/3/discover/movie?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results.slice(0, limit); // Return top movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const getTvShows = async ({
  year = null,
  sortBy = "popularity.desc",
  includeAdult = false,
  language = "en-US",
  limit = 20, // Default to 20 TV shows
} = {}) => {
  // Match the variable name in your .env.local file
  const token = process.env.TMDB_API_TOKEN;

  const queryParams = new URLSearchParams({
    include_adult: includeAdult,
    language,
    sort_by: sortBy,
    with_original_language: "en", // Focus on English-language content
    "vote_count.gte": 50, // Minimum votes threshold (lower for TV shows)
  });

  if (year) {
    queryParams.append("first_air_date_year", year); // Adds year filter for TV shows
  }

  const url = `https://api.themoviedb.org/3/discover/tv?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch TV shows: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results.slice(0, limit); // Return top TV shows
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return [];
  }
};

// NEW FUNCTION: Get details for a specific movie by ID
export const getMovieById = async (id) => {
  if (!id) return null;

  const token = process.env.TMDB_API_TOKEN;

  // We'll append credits to get cast and crew info in a single request
  const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Movie not found
      }
      throw new Error(`Failed to fetch movie: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error);
    return null;
  }
};

// NEW FUNCTION: Get details for a specific TV show by ID
export const getTvShowById = async (id) => {
  if (!id) return null;

  const token = process.env.TMDB_API_TOKEN;

  // We'll append credits to get cast and crew info in a single request
  const url = `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // TV show not found
      }
      throw new Error(`Failed to fetch TV show: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching TV show ${id}:`, error);
    return null;
  }
};
