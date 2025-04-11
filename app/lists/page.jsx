"use client";

import { useContext, useEffect, useState } from "react";
import { ListContext } from "@/library/contexts/ListContext";
import Link from "next/link";
import Image from "next/image";
import {
  FilmIcon,
  TvIcon,
  ListBulletIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

export default function MyListsPage() {
  const { publishedLists } = useContext(ListContext);
  const [listsArray, setListsArray] = useState([]);

  // Convert the lists object to an array for rendering
  useEffect(() => {
    // Get all lists and sort by publish date (newest first)
    const lists = Object.values(publishedLists).sort((a, b) => {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });
    setListsArray(lists);
  }, [publishedLists]);

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">My Lists</h1>

      {listsArray.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listsArray.map((list) => {
            const isMovieList = list.type === "movie";
            const urlType = isMovieList ? "movies" : "tv";
            const itemCount = list.items?.length || 0;

            // Get first item poster for display
            const firstItem = list.items?.[0];
            const posterPath = firstItem?.poster_path
              ? `https://image.tmdb.org/t/p/w92${firstItem.poster_path}`
              : isMovieList
              ? "/placeholder-movie.jpg"
              : "/placeholder-tv.jpg";

            return (
              <Link
                key={list.id}
                href={`/lists/${urlType}/publish/${list.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-4 border-b dark:border-gray-700 flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    {isMovieList ? (
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
                      {formatDate(list.publishedAt)}
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
                        ? `View your ranked ${
                            isMovieList ? "movies" : "TV shows"
                          }`
                        : `Empty ${isMovieList ? "movie" : "TV show"} list`}
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
      )}
    </div>
  );
}
