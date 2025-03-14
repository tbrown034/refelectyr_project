"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  HomeIcon,
  PlusIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

export default function ActionButtons({ itemType, item }) {
  const router = useRouter();
  const [isInList, setIsInList] = useState(false);

  // Check if this item is in the list on mount and when item changes
  useEffect(() => {
    if (!item || !item.id) return;

    try {
      const listKey = itemType === "movie" ? "userMovieList" : "userTvList";
      const storedList = localStorage.getItem(listKey);

      if (storedList) {
        const list = JSON.parse(storedList);
        setIsInList(list.some((listItem) => listItem.id === item.id));
      } else {
        setIsInList(false);
      }
    } catch (error) {
      console.error("Error checking list status:", error);
      setIsInList(false);
    }
  }, [item, itemType]);

  const handleGoBack = () => {
    router.back();
  };

  const handleAddToList = () => {
    if (!item || !item.id) return;

    try {
      const listKey = itemType === "movie" ? "userMovieList" : "userTvList";
      let list = [];

      const storedList = localStorage.getItem(listKey);
      if (storedList) {
        list = JSON.parse(storedList);
      }

      // Don't add if already in list
      if (list.some((listItem) => listItem.id === item.id)) {
        return;
      }

      // Max 10 items
      if (list.length >= 10) {
        alert(
          `Your ${
            itemType === "movie" ? "movie" : "TV show"
          } list is full (max 10 items). Remove something first.`
        );
        return;
      }

      // Add with timestamp
      list.push({
        ...item,
        addedAt: new Date().toISOString(),
      });

      localStorage.setItem(listKey, JSON.stringify(list));
      setIsInList(true);

      // Notify about update
      window.dispatchEvent(new Event("listUpdated"));
    } catch (error) {
      console.error("Error adding to list:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={handleGoBack}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back</span>
      </button>

      <Link href="/">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          <HomeIcon className="h-5 w-5" />
          <span>Home</span>
        </button>
      </Link>

      <button
        onClick={handleAddToList}
        disabled={isInList}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isInList
            ? "bg-green-600 text-white cursor-default"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {isInList ? (
          <>
            <CheckIcon className="h-5 w-5" />
            <span>Added to List</span>
          </>
        ) : (
          <>
            <PlusIcon className="h-5 w-5" />
            <span>Add to My List</span>
          </>
        )}
      </button>
    </div>
  );
}
