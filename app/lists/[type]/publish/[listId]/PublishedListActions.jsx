// app/lists/[type]/publish/[listId]/PublishedListActions.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ListContext } from "@/library/contexts/ListContext";

export default function PublishedListActions({
  isValidType,
  pageTypeLabel,
  listId,
  onCreateNew,
}) {
  const router = useRouter();
  const { deletePublishedList } = useContext(ListContext);

  const handleDeleteList = () => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${pageTypeLabel} list? This cannot be undone.`
      )
    ) {
      deletePublishedList(listId);
      router.push("/lists");
    }
  };

  // Added new function to navigate to recommendations
  const handleGetRecommendations = () => {
    // Navigate to the recommendations page - this path is correct
    const type = pageTypeLabel === "Movie" ? "movies" : "tv";
    router.push(`/lists/${type}/recommendations/${listId}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Start New List Button */}
      <button
        onClick={onCreateNew}
        disabled={!isValidType}
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

      {/* NEW: Get Recommendations Button */}
      <button
        onClick={handleGetRecommendations}
        disabled={!isValidType}
        className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm sm:text-base transition-colors ${
          !isValidType
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800"
        }`}
        title={`Get personalized ${pageTypeLabel.toLowerCase()} recommendations based on your list`}
      >
        <SparklesIcon className="h-5 w-5 flex-shrink-0" />
        <span>Get Recommendations</span>
      </button>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400 dark:active:bg-gray-400 transition-colors text-sm sm:text-base"
      >
        <ArrowLeftIcon className="h-5 w-5 flex-shrink-0" />
        <span>Back to Home</span>
      </Link>

      {/* Delete List Button */}
      <button
        onClick={handleDeleteList}
        className="inline-flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base ml-auto"
        title={`Delete this ${pageTypeLabel} list permanently`}
      >
        <TrashIcon className="h-5 w-5 flex-shrink-0" />
        <span>Delete List</span>
      </button>
    </div>
  );
}
