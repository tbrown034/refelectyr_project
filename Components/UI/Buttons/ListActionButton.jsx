"use client";

import { useState, useEffect } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";

export default function ListActionButton({ itemType, item }) {
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

  const handleAddToList = (e) => {
    e.stopPropagation(); // Prevent navigating to detail page
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
    } catch (error) {
      console.error("Error adding to list:", error);
    }
  };

  // Don't show anything if there's no item
  if (!item) return null;

  return (
    <button
      onClick={handleAddToList}
      disabled={isInList}
      aria-label={
        isInList
          ? "Already added to list"
          : `Add ${itemType === "movie" ? "movie" : "TV show"} to my list`
      }
      className={`absolute top-2 right-2 p-2 rounded-full z-10 opacity-90 hover:opacity-100 transition-colors ${
        isInList
          ? "bg-green-600 text-white cursor-default"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {isInList ? (
        <CheckIcon className="h-5 w-5" />
      ) : (
        <PlusIcon className="h-5 w-5" />
      )}
    </button>
  );
}
