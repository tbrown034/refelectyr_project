// components/ui/inputs/YearSelector.jsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import { YearContext } from "@/library/contexts/YearContext";

export default function YearSelector({
  navigateOnChange = true,
  startYear = 2000,
  endYear = new Date().getFullYear(),
  className = "",
  initialYear = null,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { selectedYear, setSelectedYear, isInitialized } =
    useContext(YearContext);

  // Track initialization to prevent multiple updates
  const hasInitialized = useRef(false);

  // Initialize component based on URL and context
  useEffect(() => {
    // Only run this once
    if (hasInitialized.current || !isInitialized) return;

    // Get year from URL
    const yearFromURL = searchParams.get("year");

    // Determine which year value to use
    // Priority: 1. initialYear prop, 2. URL param, 3. Context value
    const effectiveYear = initialYear || yearFromURL || selectedYear;

    // Update context if needed
    if (effectiveYear !== selectedYear) {
      setSelectedYear(effectiveYear);
    }

    // Update URL if needed
    if (navigateOnChange && yearFromURL !== effectiveYear) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("year", effectiveYear);
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }

    hasInitialized.current = true;
  }, [
    searchParams,
    initialYear,
    selectedYear,
    setSelectedYear,
    router,
    pathname,
    navigateOnChange,
    isInitialized,
  ]);

  // Handle year selection change
  const handleChange = (event) => {
    const newYear = event.target.value;

    // Update context
    setSelectedYear(newYear);

    // Update URL
    if (navigateOnChange) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("year", newYear);
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  };

  // Generate array of years dynamically
  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) =>
    (startYear + index).toString()
  ).reverse(); // Most recent years first

  return (
    <div className={`max-w-xs mx-auto ${className}`}>
      <label
        htmlFor="year-selector"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        Select Year:
      </label>
      <select
        id="year-selector"
        name="year"
        value={selectedYear}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
                 bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-label="Select content year"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
