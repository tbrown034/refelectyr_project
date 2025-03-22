// Contexts/ListContext.js
"use client";

import { createContext, useState, useEffect } from "react";
import { MAX_LIST_SIZE } from "@/library/utils/defaults";

export const ListContext = createContext({
  movieList: [],
  tvList: [],
  addToList: () => false,
  removeFromList: () => {},
  moveItemUp: () => {},
  moveItemDown: () => {},
  clearList: () => {},
  isInList: () => false,
});

export function ListProvider({ children }) {
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize lists from localStorage
  useEffect(() => {
    try {
      const storedMovieList = localStorage.getItem("userMovieList");
      const storedTvList = localStorage.getItem("userTvList");

      if (storedMovieList) {
        setMovieList(JSON.parse(storedMovieList));
      }

      if (storedTvList) {
        setTvList(JSON.parse(storedTvList));
      }

      setIsInitialized(true);
    } catch (error) {
      console.error("Error loading lists:", error);
      setIsInitialized(true);
    }
  }, []);

  // Save lists to localStorage whenever they change
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

  // Check if item is in list
  const isInList = (itemType, itemId) => {
    const list = itemType === "movie" ? movieList : tvList;
    return list.some((item) => item.id === itemId);
  };

  // Add item to list
  const addToList = (itemType, item) => {
    if (!item || !item.id) return false;

    // Get the correct list
    const list = itemType === "movie" ? movieList : tvList;
    const setList = itemType === "movie" ? setMovieList : setTvList;

    // Check if already in list
    if (list.some((listItem) => listItem.id === item.id)) {
      return false;
    }

    // Check if list is full
    if (list.length >= MAX_LIST_SIZE) {
      alert(
        `Your ${
          itemType === "movie" ? "movie" : "TV show"
        } list is full (max 10 items). Remove something first.`
      );
      return false;
    }

    // Add with timestamp
    setList([
      ...list,
      {
        ...item,
        addedAt: new Date().toISOString(),
      },
    ]);

    return true;
  };

  // Remove item from list
  const removeFromList = (itemType, itemId) => {
    const list = itemType === "movie" ? movieList : tvList;
    const setList = itemType === "movie" ? setMovieList : setTvList;

    setList(list.filter((item) => item.id !== itemId));
  };

  // Move item up in list
  const moveItemUp = (itemType, itemId) => {
    const list = itemType === "movie" ? movieList : tvList;
    const setList = itemType === "movie" ? setMovieList : setTvList;

    const index = list.findIndex((item) => item.id === itemId);
    if (index <= 0) return;

    const newList = [...list];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];

    setList(newList);
  };

  // Move item down in list
  const moveItemDown = (itemType, itemId) => {
    const list = itemType === "movie" ? movieList : tvList;
    const setList = itemType === "movie" ? setMovieList : setTvList;

    const index = list.findIndex((item) => item.id === itemId);
    if (index === -1 || index >= list.length - 1) return;

    const newList = [...list];
    [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];

    setList(newList);
  };

  // Clear list
  const clearList = (itemType) => {
    const setList = itemType === "movie" ? setMovieList : setTvList;
    setList([]);
  };

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
      }}
    >
      {children}
    </ListContext.Provider>
  );
}
