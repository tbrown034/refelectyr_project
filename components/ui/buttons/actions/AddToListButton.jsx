"use client";

import { useState, useEffect, useCallback } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { use } from "react";
import { ListContext } from "@/library/contexts/ListContext";

export default function AddToListButton({ itemType, item, className = "" }) {
  const { isInList, addToList, removeFromList, movieList, tvList } =
    use(ListContext);

  // Don't initialize with useState - compute it directly from the lists
  // This is crucial to ensure the button always shows the correct state
  const currentlyInList =
    item && item.id ? isInList(itemType, String(item.id)) : false;

  const handleAddToList = (e) => {
    e.preventDefault(); // Prevent default navigation
    e.stopPropagation(); // Prevent event bubbling

    if (!item || !item.id) return;
    const itemId = String(item.id);

    if (currentlyInList) {
      removeFromList(itemType, itemId);
    } else {
      addToList(itemType, item);
    }
  };

  // Don't show anything if there's no item
  if (!item) return null;

  return (
    <button
      onClick={handleAddToList}
      aria-label={currentlyInList ? `Remove from list` : `Add to list`}
      className={`p-2.5 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 ${
        currentlyInList
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white ${className}`}
      data-in-list={currentlyInList}
    >
      {currentlyInList ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <PlusIcon className="h-4 w-4" />
      )}
    </button>
  );
}
