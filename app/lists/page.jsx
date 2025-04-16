// app/lists/page.jsx
"use client";

import { useContext, useEffect, useState } from "react";
import { ListContext } from "@/library/contexts/ListContext";
import Link from "next/link";
import Image from "next/image";
import {
  FilmIcon,
  TrashIcon,
  TvIcon,
  ListBulletIcon,
  ArrowRightIcon,
  ExclamationCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export default function MyListsPage() {
  const {
    publishedLists,
    recommendationLists,
    hasReachedPublishedListLimit,
    ANONYMOUS_LIST_LIMIT,
    deleteAllPublishedLists,
    deleteAllRecommendationLists,
  } = useContext(ListContext);

  const [regularLists, setRegularLists] = useState([]);
  const [movieLists, setMovieLists] = useState([]);
  const [tvLists, setTvLists] = useState([]);
  const [movieRecommendations, setMovieRecommendations] = useState([]);
  const [tvRecommendations, setTvRecommendations] = useState([]);

  // Add new state for tracking limit status
  const [isNearLimit, setIsNearLimit] = useState(false);
  const [isAtLimit, setIsAtLimit] = useState(false);

  // Convert the lists object to arrays for rendering, grouped by type
  useEffect(() => {
    // Get all lists and sort by publish date (newest first)
    const allRegularLists = Object.values(publishedLists).sort((a, b) => {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });

    // Separate by type
    const movieListsArray = allRegularLists.filter(
      (list) => list.type === "movie"
    );
    const tvListsArray = allRegularLists.filter((list) => list.type === "tv");

    // Process recommendation lists
    const allRecommendationLists = Object.values(recommendationLists).sort(
      (a, b) => {
        return new Date(b.savedAt) - new Date(a.savedAt);
      }
    );

    // Separate recommendation lists by type
    const movieRecsArray = allRecommendationLists.filter(
      (list) => list.type === "movie"
    );
    const tvRecsArray = allRecommendationLists.filter(
      (list) => list.type === "tv"
    );

    setRegularLists(allRegularLists);
    setMovieLists(movieListsArray);
    setTvLists(tvListsArray);
    setMovieRecommendations(movieRecsArray);
    setTvRecommendations(tvRecsArray);

    // Check if we're near or at the limit
    const regularListCount = allRegularLists.length;
    setIsNearLimit(regularListCount >= ANONYMOUS_LIST_LIMIT - 1);
    setIsAtLimit(hasReachedPublishedListLimit());
  }, [
    publishedLists,
    recommendationLists,
    hasReachedPublishedListLimit,
    ANONYMOUS_LIST_LIMIT,
  ]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid Date";
    }
  };

  // Handle delete all lists with confirmation
  const handleDeleteAllLists = () => {
    // Check if there are any lists to delete
    if (regularLists.length === 0) {
      alert("You don't have any lists to delete.");
      return;
    }

    // Show confirmation dialog with count
    if (
      window.confirm(
        `Are you sure you want to delete all ${regularLists.length} of your lists? This cannot be undone.`
      )
    ) {
      deleteAllPublishedLists();
    }
  };

  // Handle delete all recommendation lists with confirmation
  const handleDeleteAllRecommendations = () => {
    const totalRecs = movieRecommendations.length + tvRecommendations.length;

    // Check if there are any recommendation lists to delete
    if (totalRecs === 0) {
      alert("You don't have any recommendation lists to delete.");
      return;
    }

    // Show confirmation dialog with count
    if (
      window.confirm(
        `Are you sure you want to delete all ${totalRecs} of your recommendation lists? This cannot be undone.`
      )
    ) {
      deleteAllRecommendationLists();
    }
  };

  // Helper function to render a list of items
  const renderListGrid = (items, type, isRecommendation = false) => {
    if (items.length === 0) {
      return (
        <p className="text-center text-gray-500 dark:text-gray-400 p-4">
          No {isRecommendation ? "recommendation " : ""}lists available.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((list) => {
          const urlType = type === "movie" ? "movies" : "tv";
          const itemCount = list.items?.length || 0;

          // Get first item poster for display
          const firstItem = list.items?.[0];
          const posterPath = firstItem?.poster_path
            ? `https://image.tmdb.org/t/p/w92${firstItem.poster_path}`
            : type === "movie"
            ? "/placeholder-movie.jpg"
            : "/placeholder-tv.jpg";

          const path = isRecommendation
            ? `/lists/${urlType}/recommendations/${list.id}` // This would need a view page for saved recommendations
            : `/lists/${urlType}/publish/${list.id}`;

          return (
            <Link
              key={list.id}
              href={path}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                isRecommendation
                  ? "border-2 border-purple-300 dark:border-purple-700"
                  : ""
              }`}
            >
              <div className="p-4 border-b dark:border-gray-700 flex items-center">
                <div className="flex-shrink-0 mr-3">
                  {isRecommendation ? (
                    <SparklesIcon
                      className={`h-8 w-8 ${
                        type === "movie" ? "text-blue-500" : "text-purple-500"
                      }`}
                    />
                  ) : type === "movie" ? (
                    <FilmIcon className="h-8 w-8 text-blue-500" />
                  ) : (
                    <TvIcon className="h-8 w-8 text-purple-500" />
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h2 className="text-lg font-semibold truncate">
                    {list.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(list.publishedAt || list.savedAt)}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-medium">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                </div>
              </div>

              <div className="flex items-center p-4">
                <div className="relative w-12 h-16 rounded overflow-hidden mr-3">
                  <Image
                    src={posterPath}
                    alt="List preview"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {itemCount > 0
                      ? `View your ${
                          isRecommendation ? "recommended" : "ranked"
                        } ${type === "movie" ? "movies" : "TV shows"}`
                      : `Empty ${type === "movie" ? "movie" : "TV show"} list`}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <ArrowRightIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  // Empty state when no lists exist
  if (
    regularLists.length === 0 &&
    movieRecommendations.length === 0 &&
    tvRecommendations.length === 0
  ) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">My Lists</h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
              <ListBulletIcon className="h-16 w-16 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-4">No Lists Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
            Start by browsing movies and TV shows to build your lists. Once you
            publish a list, it will appear here.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/movies"
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <FilmIcon className="h-5 w-5 mr-2" />
              Browse Movies
            </Link>
            <Link
              href="/tv"
              className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
            >
              <TvIcon className="h-5 w-5 mr-2" />
              Browse TV Shows
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Lists</h1>

        <div className="flex gap-2">
          {regularLists.length > 0 && (
            <button
              onClick={handleDeleteAllLists}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors"
              title="Delete all your lists permanently"
            >
              <TrashIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Delete All Lists</span>
              <span className="sm:hidden">Delete Lists</span>
            </button>
          )}

          {(movieRecommendations.length > 0 ||
            tvRecommendations.length > 0) && (
            <button
              onClick={handleDeleteAllRecommendations}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors"
              title="Delete all your recommendation lists permanently"
            >
              <TrashIcon className="h-5 w-5" />
              <span className="hidden sm:inline">
                Delete All Recommendations
              </span>
              <span className="sm:hidden">Delete Recs</span>
            </button>
          )}
        </div>
      </div>

      {/* Add limit warning banner */}
      {isNearLimit && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            isAtLimit
              ? "bg-red-100 dark:bg-red-900/30"
              : "bg-yellow-100 dark:bg-yellow-900/30"
          }`}
        >
          <div className="flex items-center gap-2">
            <ExclamationCircleIcon
              className={`h-5 w-5 ${
                isAtLimit
                  ? "text-red-600 dark:text-red-400"
                  : "text-yellow-600 dark:text-yellow-400"
              }`}
            />
            <p
              className={`font-medium ${
                isAtLimit
                  ? "text-red-800 dark:text-red-200"
                  : "text-yellow-800 dark:text-yellow-200"
              }`}
            >
              {isAtLimit
                ? `You've reached the limit of ${ANONYMOUS_LIST_LIMIT} lists for non-registered users.`
                : `You have ${ANONYMOUS_LIST_LIMIT - regularLists.length} list${
                    ANONYMOUS_LIST_LIMIT - regularLists.length !== 1 ? "s" : ""
                  } remaining.`}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Sign up for a free account to create unlimited lists and access
              them from any device.
            </p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Sign Up Now
            </button>
          </div>
        </div>
      )}

      {/* Regular Lists Section */}
      {regularLists.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">My Lists</h2>

          {/* Movie Lists */}
          {movieLists.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FilmIcon className="h-6 w-6 text-blue-500 mr-2" />
                Movie Lists
              </h3>
              {renderListGrid(movieLists, "movie")}
            </div>
          )}

          {/* TV Lists */}
          {tvLists.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <TvIcon className="h-6 w-6 text-purple-500 mr-2" />
                TV Show Lists
              </h3>
              {renderListGrid(tvLists, "tv")}
            </div>
          )}
        </section>
      )}

      {/* Recommendation Lists Section */}
      {(movieRecommendations.length > 0 || tvRecommendations.length > 0) && (
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <SparklesIcon className="h-6 w-6 text-purple-500 mr-2" />
            My Recommendations
          </h2>

          {/* Movie Recommendations */}
          {movieRecommendations.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FilmIcon className="h-6 w-6 text-blue-500 mr-2" />
                Movie Recommendations
              </h3>
              {renderListGrid(movieRecommendations, "movie", true)}
            </div>
          )}

          {/* TV Recommendations */}
          {tvRecommendations.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <TvIcon className="h-6 w-6 text-purple-500 mr-2" />
                TV Show Recommendations
              </h3>
              {renderListGrid(tvRecommendations, "tv", true)}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
