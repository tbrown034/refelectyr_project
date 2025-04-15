"use client";

import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ListActionButton from "@/components/ui/buttons/actions/AddToListButton";

export default function MovieCard({ movie }) {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  // Format release date to just show the year
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown";

  // Check if poster path exists
  const hasPoster = Boolean(movie.poster_path);

  const handleClick = () => {
    router.push(`/movies/${movie.id}`);
  };

  return (
    <li
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer relative"
      onClick={handleClick}
    >
      {/* List Action Button (Add to list) */}
      <ListActionButton itemType="movie" item={movie} />

      {/* Movie Poster or Fallback */}
      <div className="relative w-full aspect-[2/3]">
        {hasPoster && !imageError ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover cursor-pointer"
            priority={false}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white cursor-pointer">
            <span className="text-center p-4">No poster available</span>
          </div>
        )}
      </div>

      {/* Movie Details */}
      <div className="p-4 cursor-pointer">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {movie.title}
        </h2>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="text-gray-700 dark:text-gray-300">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>
          <span className="text-gray-600 dark:text-gray-400">
            {releaseYear}
          </span>
        </div>
      </div>
    </li>
  );
}
