// app/lists/[type]/recommendations/[listId]/RecommendationsDisplay.jsx
"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon, PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ListContext } from "@/library/contexts/ListContext";

export default function RecommendationsDisplay({
  recommendations,
  listIsMovieType,
}) {
  const { addToList, isInList } = useContext(ListContext);
  const [addedItems, setAddedItems] = useState({});

  // Handle adding a recommendation to the user's list
  const handleAddToList = (recommendation) => {
    const type = listIsMovieType ? "movie" : "tv";
    const success = addToList(type, recommendation);

    if (success) {
      // Track which items have been added
      setAddedItems((prev) => ({
        ...prev,
        [recommendation.id]: true,
      }));
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Here are personalized recommendations based on your list. Click the +
        button to add any recommendation to your current list.
      </p>

      <ul className="space-y-4">
        {recommendations.map((rec) => {
          // Get title/name based on type
          const title = listIsMovieType ? rec.title : rec.name;

          // Get year from release_date or first_air_date
          const year = listIsMovieType
            ? rec.release_date
              ? new Date(rec.release_date).getFullYear()
              : rec.year || "Unknown"
            : rec.first_air_date
            ? new Date(rec.first_air_date).getFullYear()
            : rec.year || "Unknown";

          // Get poster path if it exists
          const posterPath = rec.poster_path
            ? `https://image.tmdb.org/t/p/w92${rec.poster_path}`
            : null;

          // Get reason (either from recommendation or default)
          const reason = rec.reason || "Based on your list preferences";

          // Check if item is already in the list
          const itemId = rec.id?.toString();
          const isAdded =
            addedItems[itemId] ||
            isInList(listIsMovieType ? "movie" : "tv", itemId);

          // Determine the detail page URL
          const detailPath = `/${listIsMovieType ? "movies" : "tv"}/${rec.id}`;

          return (
            <li
              key={rec.id || `rec_${title}`}
              className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              {/* Poster image or placeholder */}
              <div className="flex-shrink-0 w-full md:w-20 h-28 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden">
                {posterPath ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={posterPath}
                      alt={`${title} poster`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm text-center px-2">
                      No Image
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-grow">
                {/* Title & Year */}
                <div className="flex justify-between">
                  <Link href={detailPath} className="hover:underline">
                    <h3 className="text-lg font-semibold">{title}</h3>
                  </Link>
                  <span className="text-gray-500">{year}</span>
                </div>

                {/* Rating if available */}
                {rec.vote_average > 0 && (
                  <div className="flex items-center mt-1">
                    <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {rec.vote_average.toFixed(1)}
                    </span>
                  </div>
                )}

                {/* Reason */}
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {reason}
                </p>

                {/* Add to list button */}
                <div className="mt-3">
                  <button
                    onClick={() => handleAddToList(rec)}
                    disabled={isAdded}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm ${
                      isAdded
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <CheckIcon className="h-4 w-4" />
                        <span>Added to List</span>
                      </>
                    ) : (
                      <>
                        <PlusIcon className="h-4 w-4" />
                        <span>Add to My List</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
