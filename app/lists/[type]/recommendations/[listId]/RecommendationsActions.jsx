// app/lists/[type]/recommendations/[listId]/RecommendationsActions.jsx
"use client";

import { useState } from "react";
import { use } from "react"; // Add this import
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  BookmarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { ListContext } from "@/library/contexts/ListContext";

export default function RecommendationsActions({
  listId,
  type,
  pageTypeLabel,
  recommendations,
  originalList,
}) {
  const [isSaving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const router = useRouter();
  const { saveRecommendationList } = use(ListContext);

  // Determine the link to the original list
  const listLink = `/lists/${type}/publish/${listId}`;

  // Handle regenerating recommendations
  const handleRegenerateClick = () => {
    // Just reload the page for a simple implementation
    window.location.reload();
  };

  // Handle saving the recommendation list
  const handleSaveList = () => {
    if (recommendations.length === 0) {
      alert("Cannot save an empty recommendation list.");
      return;
    }

    setSaving(true);

    try {
      // Create a title based on the original list
      const title = `Recommendations based on ${
        originalList?.title || "My List"
      }`;

      // Media type for storage (movie/tv, not movies/tv)
      const mediaType = type === "movies" ? "movie" : "tv";

      // Save the recommendation list
      const savedListId = saveRecommendationList(
        listId, // Source list ID
        mediaType, // Type (movie/tv)
        recommendations, // Items
        title // Title
      );

      if (savedListId) {
        setSaveSuccess(true);
        setTimeout(() => {
          // Navigate to the saved recommendations page (FIXED URL PATH)
          router.push(`/lists/${type}/saved-recommendations/${savedListId}`);
        }, 1500);
      } else {
        alert("Failed to save recommendation list. Please try again.");
        setSaving(false);
      }
    } catch (error) {
      console.error("Error saving recommendation list:", error);
      alert("An error occurred while saving. Please try again.");
      setSaving(false);
    }
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

      {/* Save Recommendations Button */}
      <button
        onClick={handleSaveList}
        disabled={isSaving || saveSuccess || recommendations.length === 0}
        className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg transition-colors text-sm sm:text-base ${
          isSaving || saveSuccess
            ? "bg-green-600 text-white cursor-default"
            : recommendations.length === 0
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
        }`}
      >
        {saveSuccess ? (
          <>
            <CheckCircleIcon className="h-5 w-5 flex-shrink-0" />
            <span>Saved!</span>
          </>
        ) : (
          <>
            <BookmarkIcon className="h-5 w-5 flex-shrink-0" />
            <span>{isSaving ? "Saving..." : "Save Recommendations"}</span>
          </>
        )}
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
