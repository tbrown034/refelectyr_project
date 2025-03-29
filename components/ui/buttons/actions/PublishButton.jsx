// components/ui/buttons/actions/PublishButton.jsx
"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ShareIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { ListContext } from "@/library/contexts/ListContext";

export default function PublishButton({ itemType, onPublish }) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const { publishList } = useContext(ListContext);
  const router = useRouter();

  const handlePublish = async () => {
    setIsPublishing(true);

    try {
      // Call the provided onPublish function or default to context's publishList
      const listId = onPublish
        ? await onPublish()
        : await publishList(itemType);

      if (listId) {
        setPublishSuccess(true);

        // Convert "movie" to "movies" for the URL
        const urlType = itemType === "movie" ? "movies" : "tv";

        // Navigate after a short delay to show success state
        setTimeout(() => {
          router.push(`/lists/${urlType}/publish/${listId}`);
        }, 1000);
      }
    } catch (error) {
      console.error("Error publishing list:", error);
      alert("Failed to publish your list. Please try again.");
      setPublishSuccess(false);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <button
      onClick={handlePublish}
      disabled={isPublishing || publishSuccess}
      className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
      aria-label={`Publish your ${itemType} list`}
    >
      {publishSuccess ? (
        <>
          <CheckCircleIcon className="h-5 w-5" />
          <span>Published!</span>
        </>
      ) : (
        <>
          <ShareIcon className="h-5 w-5" />
          <span>{isPublishing ? "Publishing..." : "Publish"}</span>
        </>
      )}
    </button>
  );
}
