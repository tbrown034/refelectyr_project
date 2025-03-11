"use client";

import { createContext, useState, useEffect } from "react";

// Define a consistent default year for the app
export const DEFAULT_YEAR = "2025";

// Create context with default value
export const YearContext = createContext({
  selectedYear: DEFAULT_YEAR,
  setSelectedYear: () => {},
  isInitialized: false,
});

export function YearProvider({ children }) {
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage if available (client-side only)
  useEffect(() => {
    // This runs only on the client side
    try {
      const storedYear = localStorage.getItem("selectedYear");
      if (storedYear) {
        setSelectedYear(storedYear);
      }
      setIsInitialized(true);
    } catch (error) {
      // Handle case where localStorage might not be available
      console.error("Error accessing localStorage:", error);
      setIsInitialized(true);
    }
  }, []);

  // Update localStorage when year changes (but only after initial load)
  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem("selectedYear", selectedYear);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [selectedYear, isInitialized]);

  return (
    <YearContext.Provider
      value={{ selectedYear, setSelectedYear, isInitialized }}
    >
      {children}
    </YearContext.Provider>
  );
}
