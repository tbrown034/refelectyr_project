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
import { use } from "react";
import { ListContext } from "@/library/contexts/ListContext";

export default function DetailPageActions({ itemType, item }) {
  const router = useRouter();
  const { isInList, addToList } = use(ListContext);
  const [isInListState, setIsInListState] = useState(false);

  useEffect(() => {
    if (!item || !item.id) return;
    setIsInListState(isInList(itemType, item.id));
  }, [item, itemType, isInList]);

  const handleGoBack = () => {
    router.back();
  };

  const handleAddToList = () => {
    if (!item || !item.id) return;

    const success = addToList(itemType, item);
    if (success) {
      setIsInListState(true);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={handleGoBack}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back</span>
      </button>

      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
      >
        <HomeIcon className="h-5 w-5" />
        <span>Home</span>
      </Link>

      <button
        onClick={handleAddToList}
        disabled={isInListState}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isInListState
            ? "bg-green-600 text-white cursor-default"
            : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        }`}
      >
        {isInListState ? (
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
