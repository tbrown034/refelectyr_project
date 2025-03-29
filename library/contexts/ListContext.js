// library/contexts/ListContext.js
"use client";

import { createContext, useState, useEffect, useCallback } from "react"; // Added useCallback
import { MAX_LIST_SIZE } from "@/library/utils/defaults";
import { generateListId } from "@/library/utils/listUtils";

export const ListContext = createContext({
  movieList: [],
  tvList: [],
  addToList: () => false,
  removeFromList: () => {},
  moveItemUp: () => {},
  moveItemDown: () => {},
  clearList: () => {},
  isInList: () => false,
  publishList: () => null,
  getPublishedList: () => null,
  publishedLists: {},
  // --- NEW Functions for Published Lists ---
  updatePublishedListItems: (listId, newItems) => {},
  updatePublishedListMetadata: (listId, metadata) => {}, // For title and timestamp
  removePublishedListItem: (listId, itemId) => {},
  // -----------------------------------------
});

export function ListProvider({ children }) {
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [publishedLists, setPublishedLists] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize lists from localStorage
  useEffect(() => {
    try {
      const storedMovieList = localStorage.getItem("userMovieList");
      const storedTvList = localStorage.getItem("userTvList");
      const storedPublishedLists = localStorage.getItem("publishedLists");

      if (storedMovieList) setMovieList(JSON.parse(storedMovieList));
      if (storedTvList) setTvList(JSON.parse(storedTvList));
      if (storedPublishedLists)
        setPublishedLists(JSON.parse(storedPublishedLists));

      setIsInitialized(true);
    } catch (error) {
      console.error("Error loading lists from localStorage:", error);
      setIsInitialized(true); // Ensure initialization completes even on error
    }
  }, []);

  // --- Persistence Effects ---
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("userMovieList", JSON.stringify(movieList));
    } catch (error) {
      console.error("Error saving movie list:", error);
    }
  }, [movieList, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("userTvList", JSON.stringify(tvList));
    } catch (error) {
      console.error("Error saving TV list:", error);
    }
  }, [tvList, isInitialized]);

  // NEW: Persist publishedLists changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("publishedLists", JSON.stringify(publishedLists));
    } catch (error) {
      console.error("Error saving published lists:", error);
    }
  }, [publishedLists, isInitialized]);
  // ---------------------------

  // Check if item is in temporary list
  const isInList = (itemType, itemId) => {
    const list = itemType === "movie" ? movieList : tvList;
    return list.some((item) => item.id === itemId);
  };

  // Add item to temporary list
  const addToList = (itemType, item) => {
    if (!item || !item.id) return false;
    const list = itemType === "movie" ? movieList : tvList;
    const setList = itemType === "movie" ? setMovieList : setTvList;

    if (list.some((listItem) => listItem.id === item.id)) return false;
    if (list.length >= MAX_LIST_SIZE) {
      alert(`Your ${itemType} list is full (max ${MAX_LIST_SIZE} items).`);
      return false;
    }
    setList([...list, { ...item, addedAt: new Date().toISOString() }]);
    return true;
  };

  // Remove item from temporary list
  const removeFromList = (itemType, itemId) => {
    const list = itemType === "movie" ? movieList : tvList;
    const setList = itemType === "movie" ? setMovieList : setTvList;
    setList(list.filter((item) => item.id !== itemId));
  };

  // Move item up in temporary list
  const moveItemUp = (itemType, itemId) => {
    const list = itemType === "movie" ? movieList : tvList;
    const setList = itemType === "movie" ? setMovieList : setTvList;
    const index = list.findIndex((item) => item.id === itemId);
    if (index <= 0) return;
    const newList = [...list];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setList(newList);
  };

  // Move item down in temporary list
  const moveItemDown = (itemType, itemId) => {
    const list = itemType === "movie" ? movieList : tvList;
    const setList = itemType === "movie" ? setMovieList : setTvList;
    const index = list.findIndex((item) => item.id === itemId);
    if (index === -1 || index >= list.length - 1) return;
    const newList = [...list];
    [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    setList(newList);
  };

  // Clear temporary list
  const clearList = (itemType) => {
    const setList = itemType === "movie" ? setMovieList : setTvList;
    setList([]);
  };

  // Publish a temporary list
  const publishList = (itemType) => {
    const list = itemType === "movie" ? movieList : tvList;
    if (list.length === 0) {
      alert("Cannot publish an empty list.");
      return null;
    }
    const listId = generateListId();
    const newPublishedList = {
      id: listId,
      type: itemType,
      items: [...list], // Create a copy
      title: `My Top ${itemType === "movie" ? "Movies" : "TV Shows"}`, // Default title
      publishedAt: new Date().toISOString(), // Timestamp
      // updatedAt: null, // Could add this later
    };
    setPublishedLists((prev) => ({ ...prev, [listId]: newPublishedList }));
    return listId;
  };

  // Get a specific published list
  const getPublishedList = useCallback(
    (listId) => {
      if (!isInitialized) return null; // Don't return until loaded
      return publishedLists[listId] || null;
    },
    [publishedLists, isInitialized]
  ); // Add dependencies

  // --- NEW: Functions to Modify Published Lists ---

  // Update the items array of a published list (for reorder/delete)
  const updatePublishedListItems = useCallback((listId, newItems) => {
    setPublishedLists((prev) => {
      if (!prev[listId]) return prev; // List not found
      return {
        ...prev,
        [listId]: {
          ...prev[listId],
          items: newItems,
          publishedAt: new Date().toISOString(), // Update timestamp on modification
        },
      };
    });
  }, []); // No dependency needed if only using setPublishedLists's functional update

  // Remove a single item from a published list
  const removePublishedListItem = useCallback((listId, itemId) => {
    setPublishedLists((prev) => {
      if (!prev[listId]) return prev;
      const currentItems = prev[listId].items || [];
      const newItems = currentItems.filter((item) => item.id !== itemId);
      // Only update if items actually changed
      if (newItems.length !== currentItems.length) {
        return {
          ...prev,
          [listId]: {
            ...prev[listId],
            items: newItems,
            publishedAt: new Date().toISOString(), // Update timestamp
          },
        };
      }
      return prev; // No change needed
    });
  }, []);

  // Update metadata (like title) of a published list
  const updatePublishedListMetadata = useCallback((listId, metadataUpdate) => {
    setPublishedLists((prev) => {
      if (!prev[listId]) return prev;
      return {
        ...prev,
        [listId]: {
          ...prev[listId],
          ...metadataUpdate, // Merge updates (e.g., { title: newTitle })
          publishedAt: new Date().toISOString(), // Update timestamp on modification
        },
      };
    });
  }, []);

  // -----------------------------------------------

  return (
    <ListContext.Provider
      value={{
        movieList,
        tvList,
        addToList,
        removeFromList,
        moveItemUp,
        moveItemDown,
        clearList,
        isInList,
        publishList,
        getPublishedList,
        publishedLists,
        // --- Provide new functions ---
        updatePublishedListItems,
        updatePublishedListMetadata,
        removePublishedListItem,
        // ---------------------------
      }}
    >
      {children}
    </ListContext.Provider>
  );
}
