// components/ui/UserListSidebar.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
  ShareIcon,
  FilmIcon,
  TvIcon,
  PlusIcon,
  CheckCircleIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { use } from "react";
import { ListContext } from "@/library/contexts/ListContext";
import { useRouter } from "next/navigation";

export default function UserListSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("movies"); // "movies" or "tv"
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [removedItemId, setRemovedItemId] = useState(null);
  const [itemAnimation, setItemAnimation] = useState({ id: null, type: null }); // For movement animations
  const router = useRouter();

  const {
    movieList,
    tvList,
    removeFromList,
    moveItemUp,
    moveItemDown,
    clearList,
  } = use(ListContext);

  // Auto-switch to non-empty tab if current tab is empty but other has items
  useEffect(() => {
    if (isOpen) {
      if (
        activeTab === "movies" &&
        movieList.length === 0 &&
        tvList.length > 0
      ) {
        setActiveTab("tv");
      } else if (
        activeTab === "tv" &&
        tvList.length === 0 &&
        movieList.length > 0
      ) {
        setActiveTab("movies");
      }
    }
  }, [isOpen, movieList.length, tvList.length, activeTab]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Get the active list based on the current tab
  const activeList = activeTab === "movies" ? movieList : tvList;

  // Check for mixed content to determine icon
  const totalItems = movieList.length + tvList.length;
  const hasMovies = movieList.length > 0;
  const hasShows = tvList.length > 0;
  const hasMixedContent = hasMovies && hasShows;

  // Handle publishing list with enhanced sharing
  const handlePublishList = () => {
    const currentList = activeTab === "movies" ? movieList : tvList;

    if (currentList.length === 0) {
      // Use better notification UI in a production app
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

    // In real app, implement proper sharing, for now use alert
    const listType = activeTab === "movies" ? "Movie" : "TV Show";
    const shareText = `My Top ${listType} List:\n\n${listItems}`;

    // Basic clipboard sharing, in production would connect to backend
    try {
      navigator.clipboard.writeText(shareText);
      setPublishSuccess(true);
      setTimeout(() => setPublishSuccess(false), 3000);
    } catch (err) {
      // Fallback in case clipboard API fails
      alert(`Your ${listType} List:\n\n${listItems}`);
      setPublishSuccess(true);
      setTimeout(() => setPublishSuccess(false), 3000);
    }
  };

  // Handle removing an item with animation
  const handleRemove = (itemId) => {
    setRemovedItemId(itemId);
    setTimeout(() => {
      removeFromList(activeTab === "movies" ? "movie" : "tv", itemId);
      setRemovedItemId(null);
    }, 300); // Match transition duration
  };

  // Move an item up in list with animation
  const handleMoveUp = (itemId) => {
    setItemAnimation({ id: itemId, type: "up" });
    moveItemUp(activeTab === "movies" ? "movie" : "tv", itemId);
    setTimeout(() => setItemAnimation({ id: null, type: null }), 300);
  };

  // Move an item down in list with animation
  const handleMoveDown = (itemId) => {
    setItemAnimation({ id: itemId, type: "down" });
    moveItemDown(activeTab === "movies" ? "movie" : "tv", itemId);
    setTimeout(() => setItemAnimation({ id: null, type: null }), 300);
  };

  // Handle clearing list with confirmation
  const handleClearList = () => {
    if (
      window.confirm(
        `Clear your entire ${
          activeTab === "movies" ? "movie" : "TV show"
        } list?`
      )
    ) {
      clearList(activeTab === "movies" ? "movie" : "tv");
    }
  };

  // Navigate to detail page for an item
  const handleViewDetails = (item) => {
    const path =
      activeTab === "movies" ? `/movies/${item.id}` : `/tv/${item.id}`;
    setIsOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg
          ${isOpen ? "bg-gray-700 text-white" : "bg-blue-600 text-white"}
          transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        aria-label={isOpen ? "Close my lists" : "Open my lists"}
        title={isOpen ? "Close my lists" : "Open my lists"}
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

      {/* Sidebar overlay - using inline style for opacity with transition */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-0 transition-opacity duration-300"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed right-0 top-0 h-full bg-white dark:bg-gray-800 shadow-xl z-50 transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-full sm:max-w-sm md:w-96 overflow-hidden flex flex-col`}
        aria-label="My Lists Sidebar"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">My Lists</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b dark:border-gray-700">
          <button
            className={`flex-1 py-3 font-medium text-center transition-colors relative ${
              activeTab === "movies"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("movies")}
            disabled={activeTab === "movies"}
            aria-selected={activeTab === "movies"}
            aria-controls="movies-panel"
          >
            <div className="flex items-center justify-center">
              <FilmIcon className="h-5 w-5 mr-2" />
              <span>Movies</span>
              <span className="ml-1">({movieList.length})</span>
            </div>
            {activeTab === "movies" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 transition-transform"></span>
            )}
          </button>
          <button
            className={`flex-1 py-3 font-medium text-center transition-colors relative ${
              activeTab === "tv"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("tv")}
            disabled={activeTab === "tv"}
            aria-selected={activeTab === "tv"}
            aria-controls="tv-panel"
          >
            <div className="flex items-center justify-center">
              <TvIcon className="h-5 w-5 mr-2" />
              <span>TV Shows</span>
              <span className="ml-1">({tvList.length})</span>
            </div>
            {activeTab === "tv" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 transition-transform"></span>
            )}
          </button>
        </div>

        {/* List content */}
        <div
          className="flex-grow overflow-y-auto p-4 scroll-smooth"
          id={activeTab === "movies" ? "movies-panel" : "tv-panel"}
          role="tabpanel"
          aria-labelledby={activeTab === "movies" ? "movies-tab" : "tv-tab"}
        >
          {activeList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="mb-4">
                {activeTab === "movies" ? (
                  <FilmIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto" />
                ) : (
                  <TvIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto" />
                )}
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {activeTab === "movies"
                  ? "Your movie list is empty."
                  : "Your TV show list is empty."}
              </p>
              <Link
                href={activeTab === "movies" ? "/movies" : "/tv"}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                <span>
                  Browse {activeTab === "movies" ? "Movies" : "TV Shows"}
                </span>
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

                // Animation classes for move/remove
                const isRemoving = removedItemId === item.id;
                const isMoving = itemAnimation.id === item.id;
                const moveDirection = itemAnimation.type;

                return (
                  <li
                    key={item.id}
                    className={`flex items-center p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm
                      transition-all duration-300
                      ${
                        isRemoving
                          ? "opacity-0 transform translate-x-full"
                          : "opacity-100"
                      }
                      ${
                        isMoving && moveDirection === "up"
                          ? "transform -translate-y-2"
                          : ""
                      }
                      ${
                        isMoving && moveDirection === "down"
                          ? "transform translate-y-2"
                          : ""
                      }
                    `}
                  >
                    {/* Rank number */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                      <span className="text-gray-800 dark:text-gray-200 font-semibold">
                        {index + 1}
                      </span>
                    </div>

                    {/* Poster thumbnail and title - clickable to go to detail */}
                    <div
                      className="flex flex-grow items-center min-w-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded transition-colors"
                      onClick={() => handleViewDetails(item)}
                    >
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
                        <p className="font-medium truncate hover:underline">
                          {title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {year}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 flex items-center space-x-2">
                      <div className="flex flex-col">
                        {index > 0 && (
                          <button
                            onClick={() => handleMoveUp(item.id)}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            aria-label={`Move ${title} up in the list`}
                            title="Move up"
                          >
                            <ChevronUpIcon className="h-5 w-5" />
                          </button>
                        )}

                        {index < activeList.length - 1 && (
                          <button
                            onClick={() => handleMoveDown(item.id)}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            aria-label={`Move ${title} down in the list`}
                            title="Move down"
                          >
                            <ChevronDownIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        aria-label={`Remove ${title} from list`}
                        title="Remove from list"
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
        <div className="p-4 border-t dark:border-gray-700 space-y-2 bg-gray-50 dark:bg-gray-800">
          {activeList.length > 0 && (
            <>
              <div className="flex gap-2">
                <button
                  onClick={handlePublishList}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  aria-label={`Publish your ${
                    activeTab === "movies" ? "movie" : "TV show"
                  } list`}
                >
                  {publishSuccess ? (
                    <>
                      <CheckCircleIcon className="h-5 w-5" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <ShareIcon className="h-5 w-5" />
                      <span>Share List</span>
                    </>
                  )}
                </button>

                <Link
                  href={activeTab === "movies" ? "/movies" : "/tv"}
                  className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors flex items-center justify-center shadow-sm"
                  onClick={() => setIsOpen(false)}
                  aria-label={`Add more ${
                    activeTab === "movies" ? "movies" : "TV shows"
                  } to your list`}
                >
                  <PlusIcon className="h-5 w-5 mr-1" />
                  <span>Add More</span>
                </Link>
              </div>

              <button
                onClick={handleClearList}
                className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500 transition-colors flex items-center justify-center gap-2"
                aria-label={`Clear your entire ${
                  activeTab === "movies" ? "movie" : "TV show"
                } list`}
              >
                <TrashIcon className="h-5 w-5" />
                <span>Clear List</span>
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
