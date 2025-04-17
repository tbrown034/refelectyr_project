// components/ui/cards/TvCard.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlusIcon, CheckIcon, StarIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ListContext } from "@/library/contexts/ListContext";

export default function TvCard({ show }) {
  const [imageError, setImageError] = useState(false);
  const { addToList, removeFromList, isInList } = useContext(ListContext);
  const isInUserList = isInList("tv", show.id.toString());

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  // Get poster URL or fallback
  const posterUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : "/placeholder-tv.jpg";

  // Format year from first air date
  const year = show.first_air_date
    ? new Date(show.first_air_date).getFullYear()
    : "Unknown";

  // Handle adding/removing from list
  const handleListAction = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling

    if (isInUserList) {
      removeFromList("tv", show.id.toString());
    } else {
      addToList("tv", show);
    }
  };

  return (
    <li className="group relative h-full">
      <Link href={`/tv/${show.id}`} className="block h-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
          {/* Poster Image */}
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            <Image
              src={imageError ? "/placeholder-tv.jpg" : posterUrl}
              alt={`${show.name} poster`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={handleImageError}
            />

            {/* Rating Badge */}
            {show.vote_average > 0 && (
              <div className="absolute top-2 left-2 flex items-center bg-black/70 text-white text-sm px-2 py-1 rounded-full">
                <StarIcon className="h-3.5 w-3.5 text-yellow-400 mr-1" />
                <span>{show.vote_average.toFixed(1)}</span>
              </div>
            )}

            {/* Add to List Button */}
            <button
              onClick={handleListAction}
              className={`absolute bottom-2 right-2 p-2 rounded-full ${
                isInUserList
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-purple-600 hover:bg-purple-700"
              } text-white shadow-lg transition-transform duration-200 hover:scale-110`}
            >
              {isInUserList ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <PlusIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Show Details */}
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
              {show.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {year}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 flex-grow">
              {show.overview || "No overview available."}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
