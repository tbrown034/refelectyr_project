// components/layout/hero/scrollingMedia/ScrollingTV.jsx
import Image from "next/image";
import Link from "next/link";
import { getTvShows } from "@/library/api/tmdb";
import { DEFAULT_YEAR } from "@/library/utils/defaults";

export default async function ScrollingTV({ year = DEFAULT_YEAR }) {
  // Fetch data with larger limit to have enough posters for scrolling
  let tvShows = [];

  try {
    tvShows = await getTvShows({
      year: year,
      sortBy: "vote_count.desc", // Using vote count for popular shows
      limit: 15, // Get more shows for smooth scrolling
      includeAdult: false,
    });
  } catch (error) {
    console.error("Error fetching TV shows for scrolling:", error);
    // Return empty array if there's an error
  }

  // If no TV shows or error, show a placeholder message
  if (tvShows.length === 0) {
    return (
      <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center">
        <h2 className="text-lg font-semibold">Popular TV Shows {year}</h2>
        <p className="text-gray-600 dark:text-gray-400">
          No TV shows available to display
        </p>
      </div>
    );
  }

  // Double the shows array for continuous scrolling effect
  const doubledShows = [...tvShows, ...tvShows];

  return (
    <div className="w-full">
      <h2 className="mb-4 text-center">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-black rounded-full bg-purple-500">
          Popular TV Shows {year}
        </span>
      </h2>

      <div className="relative w-full overflow-hidden group rounded-xl">
        <div className="flex animate-scrollRight gap-4">
          {doubledShows.map((show, index) => (
            <div
              key={`${show.id}-${index}`}
              className="flex-shrink-0 w-24 sm:w-32 transition-transform hover:scale-105"
            >
              <Link href={`/tv/${show.id}`}>
                <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={
                      show.poster_path
                        ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
                        : "/placeholder-tv.jpg"
                    }
                    alt={`Poster of ${show.name}`}
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
