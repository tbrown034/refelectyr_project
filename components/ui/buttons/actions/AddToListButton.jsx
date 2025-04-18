"use client";

import { useState, useEffect, useCallback } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { use } from "react";
import { ListContext } from "@/library/contexts/ListContext";

export default function AddToListButton({ itemType, item, className = "" }) {
  console.log("AddToListButton RENDER", {
    itemType,
    itemId: item?.id,
    itemTitle: item?.title || item?.name,
  });

  const { isInList, addToList, removeFromList, movieList, tvList } =
    use(ListContext);

  // Detailed logging function
  const checkIfInList = useCallback(() => {
    if (!item || !item.id) {
      console.error("No item or no item.id to check");
      return false;
    }

    const stringId = String(item.id);
    const currentList = itemType === "movie" ? movieList : tvList;

    console.log("List Check Debug", {
      itemType,
      stringId,
      currentList,
      listItemIds: currentList.map((i) => String(i.id)),
      isInList: currentList.some((i) => String(i.id) === stringId),
    });

    return currentList.some((i) => String(i.id) === stringId);
  }, [item, itemType, movieList, tvList]);

  const [isCurrentlyInList, setIsCurrentlyInList] = useState(checkIfInList());

  // Recheck list status when relevant dependencies change
  useEffect(() => {
    const inListStatus = checkIfInList();
    console.log("List Status Update", {
      itemType,
      itemId: item?.id,
      inListStatus,
    });
    setIsCurrentlyInList(inListStatus);
  }, [item, itemType, movieList, tvList, checkIfInList]);

  const handleToggleList = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!item || !item.id) {
      console.error("Cannot add/remove - no item or no item.id");
      return;
    }

    const itemId = String(item.id);

    console.log("Toggle List Action", {
      action: isCurrentlyInList ? "REMOVE" : "ADD",
      itemType,
      itemId,
      itemTitle: item.title || item.name,
    });

    if (isCurrentlyInList) {
      removeFromList(itemType, itemId);
      setIsCurrentlyInList(false);
    } else {
      const success = addToList(itemType, item);
      if (success) {
        setIsCurrentlyInList(true);
      }
    }
  };

  if (!item) return null;

  return (
    <button
      onClick={handleToggleList}
      aria-label={isCurrentlyInList ? `Remove from list` : `Add to list`}
      className={`p-2.5 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 ${
        isCurrentlyInList
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white ${className}`}
      data-in-list={isCurrentlyInList}
    >
      {isCurrentlyInList ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <PlusIcon className="h-4 w-4" />
      )}
    </button>
  );
}
