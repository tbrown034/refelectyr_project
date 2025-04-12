// app/lists/[type]/publish/[listId]/PublishedListActions.jsx
"use client";

import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ListContext } from "@/library/contexts/ListContext";

export default function PublishedListActions({
  isValidType, // Boolean: true if URL type is valid
  pageTypeLabel, // String: 'Movie' or 'TV Show'
  listId, // The ID of the current list (NEW PROP)
  onCreateNew, // Function: () => void - Handles starting a new temp list
}) {
  const router = useRouter();
  const { deletePublishedList } = useContext(ListContext);

  // NEW FUNCTION: Handle delete list with confirmation
  const handleDeleteList = () => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${pageTypeLabel} list? This cannot be undone.`
      )
    ) {
      deletePublishedList(listId);
      router.push("/lists");
    }
  };

  return (
    // Container for non-sharing actions
    <div className="flex flex-wrap items-center gap-3">
      {/* Start New List Button */}
      <button
        onClick={onCreateNew}
        disabled={!isValidType} // Prevent if URL type invalid
        className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg transition-colors text-sm sm:text-base ${
          !isValidType
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-yellow-500 text-black hover:bg-yellow-600 active:bg-yellow-700"
        }`}
        title={
          !isValidType
            ? "Cannot start new list for invalid type"
            : `Start a new temporary ${pageTypeLabel} list (clears current temporary list)`
        }
      >
        <PlusIcon className="h-5 w-5 flex-shrink-0" />
        <span>Start New {pageTypeLabel} List</span>
      </button>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400 dark:active:bg-gray-400 transition-colors text-sm sm:text-base"
      >
        <ArrowLeftIcon className="h-5 w-5 flex-shrink-0" />
        <span>Back to Home</span>
      </Link>

      {/* NEW: Delete List Button */}
      <button
        onClick={handleDeleteList}
        className="inline-flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base ml-auto"
        title={`Delete this ${pageTypeLabel} list permanently`}
      >
        <TrashIcon className="h-5 w-5 flex-shrink-0" />
        <span>Delete List</span>
      </button>
    </div>
  );
}
