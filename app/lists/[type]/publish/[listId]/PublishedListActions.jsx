"use client";

import Link from "next/link";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";

export default function PublishedListActions({
  isValidType, // Boolean: true if URL type is valid
  pageTypeLabel, // String: 'Movie' or 'TV Show'
  onCreateNew, // Function: () => void - Handles starting a new temp list
}) {
  return (
    // Container for non-sharing actions
    <div className="flex flex-wrap items-center gap-3">
      {/* Start New List Button */}
      <button
        onClick={onCreateNew}
        disabled={!isValidType} // Prevent if URL type invalid
        className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg transition-colors text-sm sm:text-base ${
          !isValidType
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-yellow-500 text-black hover:bg-yellow-600 active:bg-yellow-700"
        }`}
        title={
          !isValidType
            ? "Cannot start new list for invalid type"
            : `Start a new temporary ${pageTypeLabel} list (clears current temporary list)`
        }
      >
        <PlusIcon className="h-5 w-5 flex-shrink-0" />
        <span>Start New {pageTypeLabel} List</span>
      </button>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400 dark:active:bg-gray-400 transition-colors text-sm sm:text-base"
      >
        <ArrowLeftIcon className="h-5 w-5 flex-shrink-0" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
