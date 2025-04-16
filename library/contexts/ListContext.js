// library/contexts/ListContext.js
"use client";

import { createContext, useState, useEffect } from "react";
import { MAX_LIST_SIZE } from "@/library/utils/defaults";
import { generateListId } from "@/library/utils/listUtils";

// Define constants for localStorage keys
const STORAGE_KEYS = {
  MOVIE_LIST: "userMovieList",
  TV_LIST: "userTvList",
  PUBLISHED_LISTS: "publishedLists",
  RECOMMENDATION_LISTS: "recommendationLists", // New storage key
};

// Add new constants for list limits
const MAX_PUBLISHED_LISTS_ANONYMOUS = 5; // Max lists for non-logged users
const MAX_RECOMMENDATION_LISTS_ANONYMOUS = 5; // Max recommendation lists
const TEMP_LIST_CLEANUP_AFTER_PUBLISH = true; // Clean temp lists after publishing

// Create the context with default values
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
  updatePublishedListItems: (listId, newItems) => {},
  updatePublishedListMetadata: (listId, metadata) => {},
  removePublishedListItem: (listId, itemId) => {},
  // Add new functions to context definition
  hasReachedPublishedListLimit: () => false,
  deletePublishedList: (listId) => {},
  ANONYMOUS_LIST_LIMIT: MAX_PUBLISHED_LISTS_ANONYMOUS,
  // New recommendation-related functions
  recommendationLists: {},
  saveRecommendationList: (sourceListId, type, items, title) => null,
  getRecommendationList: (listId) => null,
  deleteRecommendationList: (listId) => {},
  updateRecommendationList: (listId, newItems) => {},
  removeRecommendationItem: (listId, itemId) => {},
});

export function ListProvider({ children }) {
  // State for lists
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [publishedLists, setPublishedLists] = useState({});
  const [recommendationLists, setRecommendationLists] = useState({}); // New state
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize lists from localStorage
  useEffect(() => {
    try {
      const storedMovieList = localStorage.getItem(STORAGE_KEYS.MOVIE_LIST);
      const storedTvList = localStorage.getItem(STORAGE_KEYS.TV_LIST);
      const storedPublishedLists = localStorage.getItem(
        STORAGE_KEYS.PUBLISHED_LISTS
      );
      const storedRecommendationLists = localStorage.getItem(
        STORAGE_KEYS.RECOMMENDATION_LISTS
      );

      if (storedMovieList) setMovieList(JSON.parse(storedMovieList));
      if (storedTvList) setTvList(JSON.parse(storedTvList));
      if (storedPublishedLists)
        setPublishedLists(JSON.parse(storedPublishedLists));
      if (storedRecommendationLists)
        setRecommendationLists(JSON.parse(storedRecommendationLists));

      setIsInitialized(true);
    } catch (error) {
      console.error("Error loading lists from localStorage:", error);
      setIsInitialized(true); // Ensure initialization completes even on error
    }
  }, []);

  // Save movie list to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEYS.MOVIE_LIST, JSON.stringify(movieList));
    } catch (error) {
      console.error("Error saving movie list:", error);
    }
  }, [movieList, isInitialized]);

  // Save TV list to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEYS.TV_LIST, JSON.stringify(tvList));
    } catch (error) {
      console.error("Error saving TV list:", error);
    }
  }, [tvList, isInitialized]);

  // Save published lists to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(
        STORAGE_KEYS.PUBLISHED_LISTS,
        JSON.stringify(publishedLists)
      );
    } catch (error) {
      console.error("Error saving published lists:", error);
    }
  }, [publishedLists, isInitialized]);

  // Save recommendation lists to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(
        STORAGE_KEYS.RECOMMENDATION_LISTS,
        JSON.stringify(recommendationLists)
      );
    } catch (error) {
      console.error("Error saving recommendation lists:", error);
    }
  }, [recommendationLists, isInitialized]);

  // Check if item is in list
  function isInList(itemType, itemId) {
    const list = itemType === "movie" ? movieList : tvList;
    return list.some((item) => item.id === itemId);
  }

  // Add item to list
  function addToList(itemType, item) {
    if (!item || !item.id) return false;

    const list = itemType === "movie" ? movieList : tvList;
    const setList = itemType === "movie" ? setMovieList : setTvList;

    // Don't add duplicates
    if (list.some((listItem) => listItem.id === item.id)) return false;

    // Check list size limit
    if (list.length >= MAX_LIST_SIZE) {
      alert(`Your ${itemType} list is full (max ${MAX_LIST_SIZE} items).`);
      return false;
    }

    // Add with timestamp
    setList([...list, { ...item, addedAt: new Date().toISOString() }]);
    return true;
  }

  // Remove item from list
  function removeFromList(itemType, itemId) {
    const list = itemType === "movie" ? movieList : tvList;
    const setList = itemType === "movie" ? setMovieList : setTvList;
    setList(list.filter((item) => item.id !== itemId));
  }

  function deleteAllPublishedLists() {
    setPublishedLists({});
  }

  // Delete all recommendation lists
  function deleteAllRecommendationLists() {
    setRecommendationLists({});
  }

  // Move item up in list
  function moveItemUp(itemType, itemId) {
    const list = itemType === "movie" ? movieList : tvList;
    const setList = itemType === "movie" ? setMovieList : setTvList;
    const index = list.findIndex((item) => item.id === itemId);

    if (index <= 0) return;

    const newList = [...list];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setList(newList);
  }

  // Move item down in list
  function moveItemDown(itemType, itemId) {
    const list = itemType === "movie" ? movieList : tvList;
    const setList = itemType === "movie" ? setMovieList : setTvList;
    const index = list.findIndex((item) => item.id === itemId);

    if (index === -1 || index >= list.length - 1) return;

    const newList = [...list];
    [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    setList(newList);
  }

  // Clear list
  function clearList(itemType) {
    const setList = itemType === "movie" ? setMovieList : setTvList;
    setList([]);
  }

  // Check if user has reached published list limit
  function hasReachedPublishedListLimit() {
    // In the future, this will check auth status
    const isLoggedIn = false; // For now, assume not logged in

    if (isLoggedIn) return false; // No limit for logged in users

    // Count current published lists
    const publishedListCount = Object.keys(publishedLists).length;
    return publishedListCount >= MAX_PUBLISHED_LISTS_ANONYMOUS;
  }

  // Check if user has reached recommendation list limit
  function hasReachedRecommendationListLimit() {
    // In the future, this will check auth status
    const isLoggedIn = false; // For now, assume not logged in

    if (isLoggedIn) return false; // No limit for logged in users

    // Count current recommendation lists
    const recommendationListCount = Object.keys(recommendationLists).length;
    return recommendationListCount >= MAX_RECOMMENDATION_LISTS_ANONYMOUS;
  }

  // Publish a list
  function publishList(itemType) {
    const list = itemType === "movie" ? movieList : tvList;

    if (list.length === 0) {
      alert("Cannot publish an empty list.");
      return null;
    }

    // Check if user has reached limit
    if (hasReachedPublishedListLimit()) {
      alert(
        `You've reached the maximum of ${MAX_PUBLISHED_LISTS_ANONYMOUS} published lists. Sign in to create more!`
      );
      return null;
    }

    const listId = generateListId();
    const newPublishedList = {
      id: listId,
      type: itemType,
      items: [...list], // Create a copy
      title: `My Top ${itemType === "movie" ? "Movies" : "TV Shows"}`, // Default title
      publishedAt: new Date().toISOString(), // Timestamp
    };

    setPublishedLists((prev) => ({ ...prev, [listId]: newPublishedList }));

    // Clean up temporary list after publishing if enabled
    if (TEMP_LIST_CLEANUP_AFTER_PUBLISH) {
      clearList(itemType);
    }

    return listId;
  }

  // Save a recommendation list
  function saveRecommendationList(sourceListId, type, items, title) {
    if (!items || items.length === 0) {
      alert("Cannot save an empty recommendation list.");
      return null;
    }

    // Check if user has reached limit
    if (hasReachedRecommendationListLimit()) {
      alert(
        `You've reached the maximum of ${MAX_RECOMMENDATION_LISTS_ANONYMOUS} recommendation lists. Sign in to save more!`
      );
      return null;
    }

    const listId = generateListId();
    const newRecommendationList = {
      id: listId,
      type,
      sourceListId, // Link to the original list
      items: [...items], // Create a copy
      title:
        title ||
        `Recommendations based on My ${
          type === "movie" ? "Movies" : "TV Shows"
        }`,
      savedAt: new Date().toISOString(), // Timestamp
    };

    setRecommendationLists((prev) => ({
      ...prev,
      [listId]: newRecommendationList,
    }));

    return listId;
  }

  // Get a published list
  function getPublishedList(listId) {
    if (!isInitialized) return null; // Don't return until loaded
    return publishedLists[listId] || null;
  }

  // Get a recommendation list
  function getRecommendationList(listId) {
    if (!isInitialized) return null; // Don't return until loaded
    return recommendationLists[listId] || null;
  }

  // Update items in a published list
  function updatePublishedListItems(listId, newItems) {
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
  }

  // Update items in a recommendation list
  function updateRecommendationList(listId, newItems) {
    setRecommendationLists((prev) => {
      if (!prev[listId]) return prev; // List not found

      return {
        ...prev,
        [listId]: {
          ...prev[listId],
          items: newItems,
          savedAt: new Date().toISOString(), // Update timestamp on modification
        },
      };
    });
  }

  // Remove an item from a published list
  function removePublishedListItem(listId, itemId) {
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
  }

  // Remove an item from a recommendation list
  function removeRecommendationItem(listId, itemId) {
    setRecommendationLists((prev) => {
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
            savedAt: new Date().toISOString(), // Update timestamp
          },
        };
      }
      return prev; // No change needed
    });
  }

  // Update metadata of a published list
  function updatePublishedListMetadata(listId, metadataUpdate) {
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
  }

  // Update metadata of a recommendation list
  function updateRecommendationListMetadata(listId, metadataUpdate) {
    setRecommendationLists((prev) => {
      if (!prev[listId]) return prev;

      return {
        ...prev,
        [listId]: {
          ...prev[listId],
          ...metadataUpdate, // Merge updates
          savedAt: new Date().toISOString(), // Update timestamp
        },
      };
    });
  }

  // Delete a published list
  function deletePublishedList(listId) {
    setPublishedLists((prev) => {
      const newPublishedLists = { ...prev };
      delete newPublishedLists[listId];
      return newPublishedLists;
    });
  }

  // Delete a recommendation list
  function deleteRecommendationList(listId) {
    setRecommendationLists((prev) => {
      const newRecommendationLists = { ...prev };
      delete newRecommendationLists[listId];
      return newRecommendationLists;
    });
  }

  // Provide context values
  return (
    <ListContext.Provider
      value={{
        // State
        movieList,
        tvList,
        publishedLists,
        recommendationLists,

        // Temporary list operations
        addToList,
        removeFromList,
        moveItemUp,
        moveItemDown,
        clearList,
        isInList,

        // Published list operations
        publishList,
        getPublishedList,
        updatePublishedListItems,
        updatePublishedListMetadata,
        removePublishedListItem,
        deleteAllPublishedLists,

        // Recommendation list operations
        saveRecommendationList,
        getRecommendationList,
        updateRecommendationList,
        updateRecommendationListMetadata,
        removeRecommendationItem,
        deleteRecommendationList,
        deleteAllRecommendationLists,

        // Limit functions
        hasReachedPublishedListLimit,
        hasReachedRecommendationListLimit,
        deletePublishedList,
        ANONYMOUS_LIST_LIMIT: MAX_PUBLISHED_LISTS_ANONYMOUS,
        RECOMMENDATION_LIST_LIMIT: MAX_RECOMMENDATION_LISTS_ANONYMOUS,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}
