// app/lists/[type]/recommendations/[listId]/RecommendationsActions.jsx
"use client";

import Link from "next/link";
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  ArrowPathIcon, // Changed from RefreshIcon
} from "@heroicons/react/24/solid";

export default function RecommendationsActions({
  listId,
  type,
  pageTypeLabel,
}) {
  // Determine the link to the original list
  const listLink = `/lists/${type}/publish/${listId}`;

  // Handle regenerating recommendations
  const handleRegenerateClick = () => {
    // Just reload the page for a simple implementation
    window.location.reload();
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Back to List Button */}
      <Link
        href={listLink}
        className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm sm:text-base"
      >
        <ArrowLeftIcon className="h-5 w-5 flex-shrink-0" />
        <span>Back to My List</span>
      </Link>

      {/* Generate New Recommendations Button */}
      <button
        onClick={handleRegenerateClick}
        className="inline-flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 active:bg-purple-800 transition-colors text-sm sm:text-base"
      >
        <ArrowPathIcon className="h-5 w-5 flex-shrink-0" />
        <span>Regenerate Recommendations</span>
      </button>

      {/* Browse All Button */}
      <Link
        href={`/${type}`}
        className="inline-flex items-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-sm sm:text-base"
      >
        <DocumentTextIcon className="h-5 w-5 flex-shrink-0" />
        <span>Browse All {pageTypeLabel}s</span>
      </Link>
    </div>
  );
}
