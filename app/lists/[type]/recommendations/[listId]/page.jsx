// app/lists/[type]/recommendations/[listId]/page.jsx
"use client";

import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ListContext } from "@/library/contexts/ListContext";
import RecommendationsDisplay from "./RecommendationsDisplay";
import RecommendationsHeader from "./RecommendationsHeader";
import RecommendationsActions from "./RecommendationsActions";
import LoadingSpinner from "@/components/ui/feedback/LoadingSpinner";

export default function RecommendationsPage() {
  const params = useParams();
  const router = useRouter();
  const { getPublishedList } = useContext(ListContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalList, setOriginalList] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Extract and validate route parameters
  const type = params?.type;
  const listId = params?.listId;
  const isValidType = type === "movies" || type === "tv";
  const pageTypeLabel = type === "movies" ? "Movie" : "TV Show";

  // Fetch list data and recommendations
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        // First, check if the list exists
        const list = getPublishedList(listId);

        if (!list) {
          setError("List not found");
          setIsLoading(false);
          return;
        }

        setOriginalList(list);

        // Fetch recommendations from API (now with TMDB enrichment)
        const apiResponse = await fetch("/api/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listId,
            type: list.type,
            items: list.items,
          }),
        });

        if (!apiResponse.ok) {
          const errorData = await apiResponse.json();
          throw new Error(errorData.error || "Failed to get recommendations");
        }

        const { recommendations } = await apiResponse.json();
        setRecommendations(recommendations);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError(err.message || "Failed to get recommendations");
      } finally {
        setIsLoading(false);
      }
    }

    if (isValidType && listId) {
      fetchData();
    } else {
      setError("Invalid request");
      setIsLoading(false);
    }
  }, [type, listId, isValidType, getPublishedList]);

  // Check if URL type matches list type
  const listIsMovieType = originalList?.type === "movie";
  const urlTypeMatchesListType =
    (listIsMovieType && type === "movies") ||
    (!listIsMovieType && type === "tv");

  // Handle loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Getting personalized recommendations...
        </p>
      </div>
    );
  }

  // Handle error state
  if (error || !originalList || !urlTypeMatchesListType) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">
          {error || "Recommendations not available"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {!originalList
            ? "The requested list could not be found."
            : !urlTypeMatchesListType
            ? "The list type doesn't match the URL type."
            : "We couldn't generate recommendations at this time. Please try again later."}
        </p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Previous Page
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header section */}
        <RecommendationsHeader
          originalList={originalList}
          pageTypeLabel={pageTypeLabel}
        />

        {/* Recommendations display */}
        <div className="p-6">
          {recommendations.length > 0 ? (
            <RecommendationsDisplay
              recommendations={recommendations}
              listIsMovieType={listIsMovieType}
            />
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No recommendations could be generated. Try creating a longer list
              with more varied items.
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <RecommendationsActions
            listId={listId}
            type={type}
            pageTypeLabel={pageTypeLabel}
          />
        </div>
      </div>
    </div>
  );
}
