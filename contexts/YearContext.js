"use client";

import { createContext, useState, useEffect } from "react";

// Create context with default value
export const YearContext = createContext({
  selectedYear: "2025",
  setSelectedYear: () => {},
});

export function YearProvider({ children }) {
  const [selectedYear, setSelectedYear] = useState("2025");

  // Initialize from localStorage if available (client-side only)
  useEffect(() => {
    try {
      const storedYear = localStorage.getItem("selectedYear");
      if (storedYear) {
        setSelectedYear(storedYear);
      }
    } catch (error) {
      // Handle case where localStorage might not be available
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  // Update localStorage when year changes
  useEffect(() => {
    try {
      localStorage.setItem("selectedYear", selectedYear);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [selectedYear]);

  return (
    <YearContext.Provider value={{ selectedYear, setSelectedYear }}>
      {children}
    </YearContext.Provider>
  );
}
