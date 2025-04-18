"use client";

import { useState, useEffect } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ListContext } from "@/library/contexts/ListContext";

export default function AddToListButton({ itemType, item, className = "" }) {
  const { isInList, addToList, removeFromList } = useContext(ListContext);
  const [inList, setInList] = useState(false);

  // Check if this item is in the list whenever relevant dependencies change
  useEffect(() => {
    if (!item || !item.id) return;

    // Use toString() since IDs might be stored as strings in some contexts
    setInList(isInList(itemType, item.id.toString()));
  }, [item, itemType, isInList]);

  const handleAddToList = (e) => {
    e.preventDefault(); // Prevent default navigation
    e.stopPropagation(); // Prevent event bubbling

    if (!item || !item.id) return;

    if (inList) {
      removeFromList(itemType, item.id.toString());
      setInList(false); // Update state immediately for better UX
    } else {
      addToList(itemType, item);
      setInList(true); // Update state immediately for better UX
    }
  };

  // Don't show anything if there's no item
  if (!item) return null;

  return (
    <button
      onClick={handleAddToList}
      aria-label={inList ? `Remove from list` : `Add to list`}
      className={`p-2.5 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 ${
        inList
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white ${className}`}
    >
      {inList ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <PlusIcon className="h-4 w-4" />
      )}
    </button>
  );
}
