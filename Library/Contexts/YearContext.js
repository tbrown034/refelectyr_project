// library/contexts/YearContext.js
"use client";

import { createContext, useState, useCallback, useEffect } from "react";
import { DEFAULT_YEAR } from "@/library/utils/defaults";

// Create context with default value
export const YearContext = createContext({
  selectedYear: DEFAULT_YEAR,
  setSelectedYear: () => {},
  isInitialized: false,
});

export function YearProvider({ children }) {
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage if available
  useEffect(() => {
    try {
      const storedYear = localStorage.getItem("selectedYear");
      if (storedYear) {
        setSelectedYear(storedYear);
      }
      setIsInitialized(true);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setIsInitialized(true);
    }
  }, []);

  // Memoize the setSelectedYear function
  const handleSetSelectedYear = useCallback((year) => {
    if (!year) return; // Add guard against null/undefined

    setSelectedYear(year);
    try {
      localStorage.setItem("selectedYear", year);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, []);

  return (
    <YearContext.Provider
      value={{
        selectedYear,
        setSelectedYear: handleSetSelectedYear,
        isInitialized,
      }}
    >
      {children}
    </YearContext.Provider>
  );
}
