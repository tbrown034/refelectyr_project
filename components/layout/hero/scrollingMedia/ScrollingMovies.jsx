// components/layout/hero/scrollingMedia/ScrollingMovies.jsx
import Image from "next/image";
import Link from "next/link";
import { getMovies } from "@/library/api/tmdb";

export default async function ScrollingMovies({ year = "2025" }) {
  // Fetch data with larger limit to have enough posters for scrolling
  let movies = [];

  try {
    movies = await getMovies({
      year,
      sortBy: "vote_count.desc", // Using vote count for popular movies
      limit: 15, // Get more movies for smooth scrolling
      includeAdult: false,
    });
  } catch (error) {
    console.error("Error fetching movies for scrolling:", error);
    // Return empty array if there's an error
  }

  // If no movies or error, show a placeholder message
  if (movies.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="mb-4 text-center">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-black rounded-full bg-amber-500">
            Popular Movies {year}
          </span>
        </h2>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No movies available for {year}
          </p>
        </div>
      </div>
    );
  }

  // Double the movies array for continuous scrolling effect
  const doubledMovies = [...movies, ...movies];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="mb-4 text-center">
        <span className="inline-block px-4 py-1 text-sm font-semibold text-black rounded-full bg-amber-500">
          Popular Movies {year}
        </span>
      </h2>

      {/* Container with overflow hidden */}
      <div className="relative w-full overflow-hidden rounded-xl group">
        {/* Inner content that scrolls */}
        <div className="flex animate-scrollLeft gap-4 w-max py-2">
          {doubledMovies.map((movie, index) => (
            <div
              key={`${movie.id}-${index}`}
              className="flex-shrink-0 w-24 sm:w-32 transition-transform hover:scale-105"
            >
              <Link href={`/movies/${movie.id}`}>
                <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : "/placeholder-movie.jpg"
                    }
                    alt={`Poster of ${movie.title}`}
                    fill
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-cover"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
