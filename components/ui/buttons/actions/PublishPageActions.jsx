// components/ui/buttons/actions/PublishPageActions.jsx
"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  PlusIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { ListContext } from "@/library/contexts/ListContext";

export default function PublishPageActions({
  isValidType,
  pageTypeLabel,
  listId,
  type,
}) {
  const [showingRecommendations, setShowingRecommendations] = useState(false);
  const { clearList } = use(ListContext);
  const router = useRouter();

  const handleCreateNew = () => {
    if (
      window.confirm(
        `This will clear your temporary ${pageTypeLabel} list and take you to the browse page. Continue?`
      )
    ) {
      const typeForAPI = type === "movies" ? "movie" : "tv";
      clearList(typeForAPI);
      router.push(`/${type}`);
    }
  };

  const handleGetRecommendations = () => {
    // For now, just show an alert
    alert("Coming soon: Personalized recommendations based on your list!");
    setShowingRecommendations(true);

    // In the future, this would call an API to get recommendations
    // and then display them in a nice UI
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Start New List Button */}
      <button
        onClick={handleCreateNew}
        disabled={!isValidType}
        className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm sm:text-base transition-colors shadow-sm ${
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
        <span>New {pageTypeLabel} List</span>
      </button>

      {/* Get Recommendations Button */}
      <button
        onClick={handleGetRecommendations}
        disabled={showingRecommendations || !isValidType}
        className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm sm:text-base transition-colors shadow-sm ${
          !isValidType || showingRecommendations
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800"
        }`}
      >
        <SparklesIcon className="h-5 w-5 flex-shrink-0" />
        <span>Get Recommendations</span>
      </button>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400 dark:active:bg-gray-400 transition-colors text-sm sm:text-base shadow-sm"
      >
        <ArrowLeftIcon className="h-5 w-5 flex-shrink-0" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
