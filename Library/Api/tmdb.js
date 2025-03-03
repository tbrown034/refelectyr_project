export const getMovies = async ({
  year = null,
  sortBy = "popularity.desc",
  includeAdult = false,
  includeVideo = false,
  language = "en-US",
  limit = 20, // ✅ Default to 20 movies
} = {}) => {
  const token = process.env.TMDM_API_TOKEN;

  const queryParams = new URLSearchParams({
    include_adult: includeAdult,
    include_video: includeVideo,
    language,
    sort_by: sortBy,
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
      next: { revalidate: 86400 }, // ✅ Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results.slice(0, limit); // ✅ Now returning top 20 movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
