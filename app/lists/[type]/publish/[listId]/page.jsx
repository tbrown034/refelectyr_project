// app/lists/[type]/publish/[listId]/page.jsx
"use client";

import { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

// Import the updated/refactored components
import PublishedListHeader from "./PublishedListHeader";
import PublishedListItems from "./PublishedListItems";
import PublishedListShare from "./PublishedListShare"; // <-- Import the new share component
import PublishedListActions from "./PublishedListActions"; // <-- This one is now simplified

import { ListContext } from "@/library/contexts/ListContext";
import { getShareableUrl, formatListText } from "@/library/utils/listUtils";

export default function PublishedListPage() {
  // ... (Keep ALL state, context hooks, derived values, useEffect, and handlers exactly the same) ...
  const params = useParams();
  const type = params?.type;
  const listId = params?.listId;
  const router = useRouter();
  const {
    getPublishedList,
    updatePublishedListItems,
    updatePublishedListMetadata,
    removePublishedListItem,
    clearList,
  } = useContext(ListContext);

  const [listData, setListData] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listNotFound, setListNotFound] = useState(false);
  const [copiedLinkSuccess, setCopiedLinkSuccess] = useState(false);
  const [copiedTextSuccess, setCopiedTextSuccess] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editableTitle, setEditableTitle] = useState("");

  const isValidType = type === "movies" || type === "tv";
  const pageTypeLabel = type === "movies" ? "Movie" : "TV Show";
  const listIsMovieType = listData?.type === "movie";

  // Data Loading useEffect... (keep as is)
  useEffect(() => {
    if (!isValidType || !listId) {
      setListNotFound(true);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setListNotFound(false);
    const fetchedList = getPublishedList(listId);
    if (!fetchedList) {
      setListNotFound(true);
    } else {
      const fetchedListIsMovie = fetchedList.type === "movie";
      if (
        (fetchedListIsMovie && type !== "movies") ||
        (!fetchedListIsMovie && type !== "tv")
      ) {
        setListNotFound(true);
      } else {
        setListData(fetchedList);
        setCurrentItems(fetchedList.items ? [...fetchedList.items] : []);
        setEditableTitle(fetchedList.title || "");
      }
    }
    setIsLoading(false);
  }, [listId, type, getPublishedList, isValidType]);

  // syncLocalStateFromContext useCallback... (keep as is)
  const syncLocalStateFromContext = useCallback(() => {
    if (!listId) return;
    const freshListData = getPublishedList(listId);
    if (freshListData) {
      setListData(freshListData);
      setCurrentItems(freshListData.items ? [...freshListData.items] : []);
      if (!isEditingTitle) {
        setEditableTitle(freshListData.title || "");
      }
    } else {
      setListNotFound(true);
    }
  }, [listId, getPublishedList, isEditingTitle]);

  // updateAndSync useCallback... (keep as is)
  const updateAndSync = useCallback(
    (newItems, metadata = {}) => {
      if (!listId) return;
      if (newItems) {
        updatePublishedListItems(listId, newItems);
      }
      if (Object.keys(metadata).length > 0) {
        updatePublishedListMetadata(listId, metadata);
      }
      setTimeout(syncLocalStateFromContext, 50);
    },
    [
      listId,
      updatePublishedListItems,
      updatePublishedListMetadata,
      syncLocalStateFromContext,
    ]
  );

  // handleMoveItemUp useCallback... (keep as is)
  const handleMoveItemUp = useCallback(
    (itemId) => {
      const index = currentItems.findIndex((item) => item.id === itemId);
      if (index <= 0) return;
      const newItems = [...currentItems];
      [newItems[index - 1], newItems[index]] = [
        newItems[index],
        newItems[index - 1],
      ];
      setCurrentItems(newItems);
      updateAndSync(newItems);
    },
    [currentItems, updateAndSync]
  );

  // handleMoveItemDown useCallback... (keep as is)
  const handleMoveItemDown = useCallback(
    (itemId) => {
      const index = currentItems.findIndex((item) => item.id === itemId);
      if (index === -1 || index >= currentItems.length - 1) return;
      const newItems = [...currentItems];
      [newItems[index], newItems[index + 1]] = [
        newItems[index + 1],
        newItems[index],
      ];
      setCurrentItems(newItems);
      updateAndSync(newItems);
    },
    [currentItems, updateAndSync]
  );

  // handleRemoveItem useCallback... (keep as is)
  const handleRemoveItem = useCallback(
    (itemId) => {
      if (window.confirm("Are you sure you want to remove this item?")) {
        const newItems = currentItems.filter((item) => item.id !== itemId);
        setCurrentItems(newItems);
        removePublishedListItem(listId, itemId);
        setTimeout(syncLocalStateFromContext, 50);
      }
    },
    [currentItems, listId, removePublishedListItem, syncLocalStateFromContext]
  );

  // Title Editing Handlers... (keep as is)
  const handleEditTitleClick = useCallback(() => {
    setEditableTitle(listData?.title || "");
    setIsEditingTitle(true);
  }, [listData]);
  const handleCancelEditTitle = useCallback(() => {
    setIsEditingTitle(false);
    setEditableTitle(listData?.title || "");
  }, [listData]);
  const handleConfirmEditTitle = useCallback(() => {
    const newTitle =
      editableTitle.trim() ||
      `My Top ${listIsMovieType ? "Movies" : "TV Shows"}`;
    setIsEditingTitle(false);
    updateAndSync(null, { title: newTitle });
  }, [editableTitle, listIsMovieType, updateAndSync]);
  const handleTitleInputChange = useCallback((event) => {
    setEditableTitle(event.target.value);
  }, []);

  // Sharing Handlers... (keep as is)
  const handleCopyLink = useCallback(() => {
    if (!type || !listId || !isValidType) return;
    const shareUrl = getShareableUrl(type, listId);
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopiedLinkSuccess(true);
        setTimeout(() => setCopiedLinkSuccess(false), 3000);
      })
      .catch((err) => console.error("Failed to copy link:", err));
  }, [type, listId, isValidType]);
  const handleCopyText = useCallback(() => {
    if (!currentItems || currentItems.length === 0 || !listData) return;
    const textToCopy = formatListText(currentItems, listData.type);
    const listTitle =
      listData.title || `My Top ${listIsMovieType ? "Movies" : "TV Shows"}`;
    const fullText = `${listTitle}\n\n${textToCopy}`;
    navigator.clipboard
      .writeText(fullText)
      .then(() => {
        setCopiedTextSuccess(true);
        setTimeout(() => setCopiedTextSuccess(false), 3000);
      })
      .catch((err) => console.error("Failed to copy text:", err));
  }, [currentItems, listData, listIsMovieType]);
  const handleSocialShare = useCallback(
    (platform) => {
      if (!type || !listId || !isValidType || !listData) return;
      const shareUrl = encodeURIComponent(getShareableUrl(type, listId));
      const listTitle =
        listData.title || `My Top ${listIsMovieType ? "Movies" : "TV Shows"}`;
      const text = encodeURIComponent(`Check out my list: ${listTitle}`);
      let platformUrl = "";
      switch (platform) {
        case "twitter":
          platformUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`;
          break;
        case "facebook":
          platformUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
          break;
        case "bluesky":
          platformUrl = `https://bsky.app/intent/compose?text=${text}%0A${shareUrl}`;
          break;
        case "instagram":
          handleCopyLink();
          alert("Instagram sharing isn't directly supported. Link copied!");
          return;
        default:
          return;
      }
      window.open(platformUrl, "_blank", "noopener,noreferrer");
    },
    [type, listId, isValidType, listData, listIsMovieType, handleCopyLink]
  );

  // Other Actions Handler... (keep as is)
  const handleCreateNew = useCallback(() => {
    const typeToClear = listData?.type || (type === "movies" ? "movie" : "tv");
    if (
      window.confirm(
        `Are you sure? This will clear your *temporary* ${pageTypeLabel} list and take you to the browse page.`
      )
    ) {
      clearList(typeToClear);
      router.push(type === "movies" ? "/movies" : "/tv");
    }
  }, [clearList, router, type, listData, pageTypeLabel]);

  // --- Render Logic ---

  if (isLoading) {
    /* ... loading state ... */
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <p className="text-lg animate-pulse text-gray-600 dark:text-gray-400">
          Loading list...
        </p>
      </div>
    );
  }
  if (listNotFound) {
    /* ... not found state ... */
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">List Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The requested list could not be found, accessed, or its type doesn't
          match the URL. Remember, lists are currently stored locally.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  // Render the main structure using child components
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <PublishedListHeader
          listData={listData}
          listIsMovieType={listIsMovieType}
          isEditingTitle={isEditingTitle}
          editableTitle={editableTitle}
          onTitleChange={handleTitleInputChange}
          onEditTitleClick={handleEditTitleClick}
          onConfirmEditTitle={handleConfirmEditTitle}
          onCancelEditTitle={handleCancelEditTitle}
        />

        <div className="p-6">
          <PublishedListItems
            items={currentItems}
            listIsMovieType={listIsMovieType}
            onMoveUp={handleMoveItemUp}
            onMoveDown={handleMoveItemDown}
            onRemove={handleRemoveItem}
          />
          {/* Button to Add More Items */}
          <div className="mt-6">
            <Link
              href={`/${type}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors text-sm"
              title={`Add more ${pageTypeLabel}s to your temporary list`}
            >
              <PlusIcon className="h-5 w-5 flex-shrink-0" />
              <span>Add More {pageTypeLabel}s</span>
            </Link>
          </div>
        </div>

        {/* --- RENDER UPDATED FOOTER AREA --- */}
        <div className="p-6 border-t dark:border-gray-700 space-y-4 bg-gray-50 dark:bg-gray-800">
          <PublishedListShare
            type={type}
            listId={listId}
            isValidType={isValidType}
            currentItems={currentItems}
            copiedLinkSuccess={copiedLinkSuccess}
            copiedTextSuccess={copiedTextSuccess}
            onCopyLink={handleCopyLink}
            onCopyText={handleCopyText}
            onSocialShare={handleSocialShare}
          />
          <PublishedListActions
            isValidType={isValidType}
            pageTypeLabel={pageTypeLabel}
            onCreateNew={handleCreateNew}
          />
        </div>
        {/* ------------------------------------ */}
      </div>
    </div>
  );
}
