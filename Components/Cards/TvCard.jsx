"use client";

import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

export default function TvCard({ show }) {
  // Format first air date to just show the year
  const firstAirYear = show.first_air_date
    ? new Date(show.first_air_date).getFullYear()
    : "Unknown";

  // Calculate poster path or use placeholder
  const posterPath = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : "/placeholder-tv.jpg"; // Add a placeholder image to your public folder

  return (
    <li className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
      {/* TV Show Poster */}
      <div className="relative w-full aspect-[2/3]">
        <Image
          src={posterPath}
          alt={`${show.name} poster`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
          onError={(e) => {
            e.target.src = "/placeholder-tv.jpg"; // Fallback if image fails to load
          }}
        />
      </div>

      {/* TV Show Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {show.name}
        </h2>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="text-gray-700 dark:text-gray-300">
              {show.vote_average ? show.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>
          <span className="text-gray-600 dark:text-gray-400">
            {firstAirYear}
          </span>
        </div>
      </div>
    </li>
  );
}
