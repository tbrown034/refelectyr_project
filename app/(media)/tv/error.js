// app/(media)/tv/error.js
"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { HomeIcon, TvIcon } from "@heroicons/react/24/solid";

export default function TvShowsError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("TV Shows section error caught:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <div className="flex flex-col items-center">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-6">
            <TvIcon className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>

          <h1 className="text-2xl font-bold mb-4">Unable to Load TV Shows</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            We're sorry, but we encountered an error while loading the TV shows
            section. This could be due to a temporary service issue.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Try Again</span>
            </button>

            <Link
              href="/"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
