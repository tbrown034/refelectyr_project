"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
  ArrowPathIcon,
  FilmIcon,
  TvIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export default function UserListSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("movies"); // "movies" or "tv"
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);

  // Load lists from localStorage
  useEffect(() => {
    const loadLists = () => {
      try {
        const storedMovieList = localStorage.getItem("userMovieList");
        const storedTvList = localStorage.getItem("userTvList");

        if (storedMovieList) {
          setMovieList(JSON.parse(storedMovieList));
        }

        if (storedTvList) {
          setTvList(JSON.parse(storedTvList));
        }
      } catch (error) {
        console.error("Error loading lists:", error);
      }
    };

    // Initial load
    loadLists();

    // Set up event listener for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "userMovieList" || e.key === "userTvList") {
        loadLists();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event for list updates within the same window
    window.addEventListener("listUpdated", loadLists);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("listUpdated", loadLists);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handlePublishList = () => {
    // For now, just show an alert with the list contents
    const currentList = activeTab === "movies" ? movieList : tvList;

    if (currentList.length === 0) {
      alert("Your list is empty! Add some items before publishing.");
      return;
    }

    // Format list items for display
    const listItems = currentList
      .map((item, index) => {
        const title = activeTab === "movies" ? item.title : item.name;
        const year =
          activeTab === "movies"
            ? item.release_date
              ? new Date(item.release_date).getFullYear()
              : "Unknown"
            : item.first_air_date
            ? new Date(item.first_air_date).getFullYear()
            : "Unknown";

        return `${index + 1}. ${title} (${year})`;
      })
      .join("\n");

    alert(
      `Your ${
        activeTab === "movies" ? "Movie" : "TV Show"
      } List:\n\n${listItems}`
    );

    // Show success message
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 3000);
  };

  // Handle removing an item
  const handleRemove = (itemId) => {
    try {
      if (activeTab === "movies") {
        const newList = movieList.filter((item) => item.id !== itemId);
        setMovieList(newList);
        localStorage.setItem("userMovieList", JSON.stringify(newList));
      } else {
        const newList = tvList.filter((item) => item.id !== itemId);
        setTvList(newList);
        localStorage.setItem("userTvList", JSON.stringify(newList));
      }

      // Notify about update
      window.dispatchEvent(new Event("listUpdated"));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Move an item up in the list
  const moveItemUp = (itemId) => {
    try {
      if (activeTab === "movies") {
        const index = movieList.findIndex((item) => item.id === itemId);
        if (index <= 0) return;

        const newList = [...movieList];
        [newList[index - 1], newList[index]] = [
          newList[index],
          newList[index - 1],
        ];

        setMovieList(newList);
        localStorage.setItem("userMovieList", JSON.stringify(newList));
      } else {
        const index = tvList.findIndex((item) => item.id === itemId);
        if (index <= 0) return;

        const newList = [...tvList];
        [newList[index - 1], newList[index]] = [
          newList[index],
          newList[index - 1],
        ];

        setTvList(newList);
        localStorage.setItem("userTvList", JSON.stringify(newList));
      }

      // Notify about update
      window.dispatchEvent(new Event("listUpdated"));
    } catch (error) {
      console.error("Error moving item:", error);
    }
  };

  // Move an item down in the list
  const moveItemDown = (itemId) => {
    try {
      if (activeTab === "movies") {
        const index = movieList.findIndex((item) => item.id === itemId);
        if (index === -1 || index >= movieList.length - 1) return;

        const newList = [...movieList];
        [newList[index], newList[index + 1]] = [
          newList[index + 1],
          newList[index],
        ];

        setMovieList(newList);
        localStorage.setItem("userMovieList", JSON.stringify(newList));
      } else {
        const index = tvList.findIndex((item) => item.id === itemId);
        if (index === -1 || index >= tvList.length - 1) return;

        const newList = [...tvList];
        [newList[index], newList[index + 1]] = [
          newList[index + 1],
          newList[index],
        ];

        setTvList(newList);
        localStorage.setItem("userTvList", JSON.stringify(newList));
      }

      // Notify about update
      window.dispatchEvent(new Event("listUpdated"));
    } catch (error) {
      console.error("Error moving item:", error);
    }
  };

  // Clear the current list
  const clearCurrentList = () => {
    try {
      if (activeTab === "movies") {
        setMovieList([]);
        localStorage.setItem("userMovieList", JSON.stringify([]));
      } else {
        setTvList([]);
        localStorage.setItem("userTvList", JSON.stringify([]));
      }

      // Notify about update
      window.dispatchEvent(new Event("listUpdated"));
    } catch (error) {
      console.error("Error clearing list:", error);
    }
  };

  // Get the active list based on the current tab
  const activeList = activeTab === "movies" ? movieList : tvList;

  // Toggle button styles
  const toggleBtnClasses = `fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg
    ${isOpen ? "bg-gray-700 text-white" : "bg-blue-600 text-white"}
    transition-all duration-300 hover:scale-105`;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className={toggleBtnClasses}
        aria-label={isOpen ? "Close my lists" : "Open my lists"}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <>
            {activeTab === "movies" ? (
              <FilmIcon className="h-6 w-6" />
            ) : (
              <TvIcon className="h-6 w-6" />
            )}
            {(movieList.length > 0 || tvList.length > 0) && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {movieList.length + tvList.length}
              </span>
            )}
          </>
        )}
      </button>

      {/* Sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full bg-white dark:bg-gray-800 shadow-xl z-50 transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-full md:w-96 overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">My Lists</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b dark:border-gray-700">
          <button
            className={`flex-1 py-3 font-medium text-center ${
              activeTab === "movies"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("movies")}
          >
            Movies ({movieList.length})
          </button>
          <button
            className={`flex-1 py-3 font-medium text-center ${
              activeTab === "tv"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("tv")}
          >
            TV Shows ({tvList.length})
          </button>
        </div>

        {/* List content */}
        <div className="flex-grow overflow-y-auto p-4">
          {activeList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {activeTab === "movies"
                  ? "Your movie list is empty."
                  : "Your TV show list is empty."}
              </p>
              <Link
                href={activeTab === "movies" ? "/movies" : "/tv"}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Browse {activeTab === "movies" ? "Movies" : "TV Shows"}
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {activeList.map((item, index) => {
                const title = activeTab === "movies" ? item.title : item.name;
                const year =
                  activeTab === "movies"
                    ? item.release_date
                      ? new Date(item.release_date).getFullYear()
                      : "Unknown"
                    : item.first_air_date
                    ? new Date(item.first_air_date).getFullYear()
                    : "Unknown";
                const posterPath = item.poster_path
                  ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                  : "/placeholder-movie.jpg";

                return (
                  <li
                    key={item.id}
                    className="flex items-center p-2 bg-white dark:bg-gray-700 rounded-lg shadow"
                  >
                    {/* Rank number */}
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mr-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {index + 1}
                      </span>
                    </div>

                    {/* Poster thumbnail */}
                    <div className="flex-shrink-0 w-10 h-14 relative mr-3">
                      <Image
                        src={posterPath}
                        alt={`${title} poster`}
                        fill
                        sizes="40px"
                        className="object-cover rounded"
                      />
                    </div>

                    {/* Title and year */}
                    <div className="flex-grow min-w-0">
                      <p className="font-medium truncate">{title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {year}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 flex items-center space-x-1">
                      {index > 0 && (
                        <button
                          onClick={() => moveItemUp(item.id)}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          aria-label="Move up"
                        >
                          <ChevronUpIcon className="h-5 w-5" />
                        </button>
                      )}

                      {index < activeList.length - 1 && (
                        <button
                          onClick={() => moveItemDown(item.id)}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          aria-label="Move down"
                        >
                          <ChevronDownIcon className="h-5 w-5" />
                        </button>
                      )}

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                        aria-label="Remove from list"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t dark:border-gray-700 space-y-2">
          {activeList.length > 0 && (
            <>
              <button
                onClick={handlePublishList}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                {publishSuccess ? (
                  <>
                    <CheckCircleIcon className="h-5 w-5" />
                    <span>List Published!</span>
                  </>
                ) : (
                  <>
                    <span>Publish List</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `Clear your entire ${
                        activeTab === "movies" ? "movie" : "TV show"
                      } list?`
                    )
                  ) {
                    clearCurrentList();
                  }
                }}
                className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowPathIcon className="h-5 w-5" />
                <span>Clear List</span>
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
