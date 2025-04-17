// components/ui/cards/MovieCard.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlusIcon, CheckIcon, StarIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ListContext } from "@/library/contexts/ListContext";

export default function MovieCard({ movie }) {
  const [imageError, setImageError] = useState(false);
  const { addToList, removeFromList, isInList } = useContext(ListContext);
  const isInUserList = isInList("movie", movie.id.toString());

  const handleImageError = () => {
    setImageError(true);
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-movie.jpg";

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown";

  const handleListAction = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInUserList) {
      removeFromList("movie", movie.id.toString());
    } else {
      addToList("movie", movie);
    }
  };

  return (
    <li className="h-full">
      <Link href={`/movies/${movie.id}`} className="block h-full">
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col relative">
          {/* Poster Image Container with Border */}
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <Image
              src={imageError ? "/placeholder-movie.jpg" : posterUrl}
              alt={`${movie.title} poster`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
              onError={handleImageError}
            />

            {/* Rating Badge */}
            <div className="absolute top-3 left-3 flex items-center bg-black/80 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md">
              <StarIcon className="h-4 w-4 text-yellow-400 mr-1.5" />
              <span>
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </span>
            </div>

            {/* Add to List Button - MOVED TO TOP RIGHT OF POSTER */}
            <button
              onClick={handleListAction}
              className={`absolute top-3 right-3 p-2.5 rounded-full ${
                isInUserList
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white shadow-lg transition-transform duration-200 hover:scale-110 z-10`}
              aria-label={isInUserList ? "Remove from list" : "Add to list"}
            >
              {isInUserList ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <PlusIcon className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Gradient Separator */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600"></div>

          {/* Movie Details - With Background */}
          <div className="p-5 flex-grow flex flex-col bg-white dark:bg-gray-800">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 mb-1">
              {movie.title}
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              {year}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 flex-grow">
              {movie.overview || "No overview available."}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
