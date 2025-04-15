// components/ui/buttons/actions/PublishButton.jsx
"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { ShareIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { ListContext } from "@/library/contexts/ListContext";

export default function PublishButton({
  itemType,
  onPublish,
  onSuccess = null, // Add callback for when publish succeeds
  disableIfPublished = false, // Control whether button should disable after publish
  alternateText = null, // Alternate text to show instead of "Published!"
}) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const { publishList } = use(ListContext);
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

        // Call onSuccess callback if provided (e.g., to close sidebar)
        if (onSuccess) {
          onSuccess(listId);
        }

        // Convert "movie" to "movies" for the URL
        const urlType = itemType === "movie" ? "movies" : "tv";

        // Navigate after a short delay to show success state
        setTimeout(() => {
          router.push(`/lists/${urlType}/publish/${listId}`);
        }, 700); // Shortened from 1000ms for better UX
      }
    } catch (error) {
      console.error("Error publishing list:", error);
      alert("Failed to publish your list. Please try again.");
      setPublishSuccess(false);
    } finally {
      setIsPublishing(false);
    }
  };

  // Button states
  const isDisabled = (disableIfPublished && publishSuccess) || isPublishing;

  // Button text based on state
  let buttonText = "Publish";
  if (isPublishing) buttonText = "Publishing...";
  else if (publishSuccess) {
    buttonText = alternateText || "Published!";
  }

  return (
    <button
      onClick={handlePublish}
      disabled={isDisabled}
      className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 cursor-pointer disabled:cursor-default"
      aria-label={`Publish your ${itemType} list`}
    >
      {publishSuccess ? (
        <>
          <CheckCircleIcon className="h-5 w-5" />
          <span>{buttonText}</span>
        </>
      ) : (
        <>
          <ShareIcon className="h-5 w-5" />
          <span>{buttonText}</span>
        </>
      )}
    </button>
  );
}
