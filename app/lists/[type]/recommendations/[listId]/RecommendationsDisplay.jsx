// app/lists/[type]/recommendations/[listId]/RecommendationsDisplay.jsx
"use client";

import { useState, useContext } from "react";
import Image from "next/image";
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

    // Create a basic item compatible with TMDB format
    const item = {
      id: `rec_${Date.now()}`, // Generate temporary ID
      [listIsMovieType ? "title" : "name"]:
        recommendation[listIsMovieType ? "title" : "name"],
      [listIsMovieType ? "release_date" : "first_air_date"]: recommendation.year
        ? `${recommendation.year}-01-01`
        : null,
      vote_average: 0,
      poster_path: null,
      // Keep the recommendation reason
      reason: recommendation.reason,
      isRecommendation: true,
    };

    const success = addToList(type, item);

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
        {recommendations.map((rec, index) => {
          const title = listIsMovieType ? rec.title : rec.name;

          const year = rec.year || "Unknown";
          const reason = rec.reason || "Based on your list preferences";
          const isAdded = addedItems[rec.id] || false;

          return (
            <li
              key={rec.id || index}
              className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              {/* Placeholder image */}
              <div className="flex-shrink-0 w-full md:w-20 h-28 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm text-center px-2">
                  No Image
                </span>
              </div>

              <div className="flex-grow">
                {/* Title & Year */}
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <span className="text-gray-500">{year}</span>
                </div>

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
