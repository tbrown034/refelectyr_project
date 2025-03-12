"use client";

import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

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
    setSelectedYear(year);
    try {
      localStorage.setItem("selectedYear", year);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, []);

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      selectedYear,
      setSelectedYear: handleSetSelectedYear,
      isInitialized,
    }),
    [selectedYear, handleSetSelectedYear, isInitialized]
  );

  return (
    <YearContext.Provider value={contextValue}>{children}</YearContext.Provider>
  );
}
