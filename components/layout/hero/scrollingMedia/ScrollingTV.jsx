// components/layout/hero/scrollingMedia/ScrollingTV.jsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { getTvShows } from "@/library/api/tmdb";

export default async function ScrollingTV({ year = "2025" }) {
  let tvShows = [];

  try {
    tvShows = await getTvShows({
      year,
      sortBy: "vote_count.desc",
      limit: 15,
      includeAdult: false,
    });
  } catch (error) {
    console.error("Error fetching TV shows for scrolling:", error);
  }

  if (tvShows.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2>
            <span className="inline-block px-4 py-1 text-sm font-semibold text-black rounded-full bg-purple-500">
              Popular TV Shows {year}
            </span>
          </h2>
          <Link
            href={`/tv?year=${year}`}
            className="px-3 py-1 text-sm flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors"
          >
            View All
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No TV shows available for {year}
          </p>
        </div>
      </div>
    );
  }

  const doubledShows = [...tvShows, ...tvShows];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2>
          <span className="inline-block px-4 py-1 text-sm font-semibold text-black rounded-full bg-purple-500">
            Popular TV Shows {year}
          </span>
        </h2>
        <Link
          href={`/tv?year=${year}`}
          className="px-3 py-1 text-sm flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors"
        >
          View All
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      {/* Container with overflow hidden - IMPORTANT: added group class here */}
      <div className="relative w-full overflow-hidden rounded-xl group">
        {/* Inner content that scrolls */}
        <div className="flex animate-scrollRight gap-6 w-max py-4">
          {doubledShows.map((show, index) => (
            <Link
              key={`${show.id}-${index}`}
              href={`/tv/${show.id}`}
              className="flex-shrink-0 w-28 sm:w-36 transition-transform hover:scale-105"
            >
              <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                <Image
                  src={
                    show.poster_path
                      ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
                      : "/placeholder-tv.jpg"
                  }
                  alt={`Poster of ${show.name}`}
                  fill
                  sizes="(max-width: 640px) 112px, 144px"
                  className="object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
