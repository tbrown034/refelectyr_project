// Components/UI/Buttons/Actions/AddToListButton.jsx
"use client";

import { useState, useEffect, use } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ListContext } from "@/library/contexts/ListContext";

export default function AddToListButton({ itemType, item }) {
  // Replace useContext with use()
  const { isInList, addToList } = use(ListContext);
  const [isInListState, setIsInListState] = useState(false);

  // Check if this item is in the list on mount and when item changes
  useEffect(() => {
    if (!item || !item.id) return;
    setIsInListState(isInList(itemType, item.id));
  }, [item, itemType, isInList]);

  const handleAddToList = (e) => {
    e.stopPropagation(); // Prevent navigating to detail page
    if (!item || !item.id) return;

    const success = addToList(itemType, item);
    if (success) {
      setIsInListState(true);
    }
  };

  // Don't show anything if there's no item
  if (!item) return null;

  return (
    <button
      onClick={handleAddToList}
      disabled={isInListState}
      aria-label={
        isInListState
          ? "Already added to list"
          : `Add ${itemType === "movie" ? "movie" : "TV show"} to my list`
      }
      className={`absolute top-2 right-2 p-2 rounded-full z-10 opacity-90 hover:opacity-100 transition-colors ${
        isInListState
          ? "bg-green-600 text-white cursor-default"
          : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
      }`}
    >
      {isInListState ? (
        <CheckIcon className="h-5 w-5" />
      ) : (
        <PlusIcon className="h-5 w-5" />
      )}
    </button>
  );
}
