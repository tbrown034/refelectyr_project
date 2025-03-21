// components/ui/buttons/ListToggleButton.jsx
"use client";

import {
  XMarkIcon,
  FilmIcon,
  TvIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { use } from "react";
import { ListContext } from "@/Library/contexts/ListContext";

export default function ListToggleButton({ isOpen, toggleSidebar, activeTab }) {
  const { movieList, tvList } = use(ListContext);

  // Calculate total items and check for mixed content
  const totalItems = movieList.length + tvList.length;
  const hasMovies = movieList.length > 0;
  const hasShows = tvList.length > 0;
  const hasMixedContent = hasMovies && hasShows;

  const toggleBtnClasses = `fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg
      ${isOpen ? "bg-gray-700 text-white" : "bg-blue-600 text-white"}
      transition-all duration-300 hover:scale-105`;

  return (
    <button
      onClick={toggleSidebar}
      className={toggleBtnClasses}
      aria-label={isOpen ? "Close my lists" : "Open my lists"}
    >
      {isOpen ? (
        <XMarkIcon className="h-6 w-6" />
      ) : (
        <>
          {hasMixedContent ? (
            <ListBulletIcon className="h-6 w-6" />
          ) : activeTab === "movies" ? (
            <FilmIcon className="h-6 w-6" />
          ) : (
            <TvIcon className="h-6 w-6" />
          )}
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </>
      )}
    </button>
  );
}
