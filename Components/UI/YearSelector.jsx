"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { YearContext, DEFAULT_YEAR } from "@/Library/contexts/YearContext";

export default function YearSelector({
  navigateOnChange = true,
  startYear = 2000,
  endYear = new Date().getFullYear(),
  className = "",
  initialYear = null,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsObj = useSearchParams();
  const [searchParams, setSearchParams] = useState(null);

  const { selectedYear, setSelectedYear } = useContext(YearContext);

  // Handle async searchParams
  useEffect(() => {
    async function resolveSearchParams() {
      try {
        // In client components, searchParams is still synchronous in Next.js 15
        // but we're preparing for the possibility it might become asynchronous
        setSearchParams(searchParamsObj);
      } catch (error) {
        console.error("Error resolving searchParams:", error);
        setSearchParams(new URLSearchParams());
      }
    }

    resolveSearchParams();
  }, [searchParamsObj]);

  // Sync state on initial load and when props change
  useEffect(() => {
    // Wait until searchParams is resolved
    if (!searchParams) return;

    // Priority: 1. initialYear prop from server, 2. URL param, 3. Context value
    if (initialYear) {
      // If initialYear is provided (from server), use it
      setSelectedYear(initialYear);

      // Ensure URL matches without causing navigation
      const yearParam = searchParams.get("year");
      if (yearParam !== initialYear && navigateOnChange) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("year", initialYear);
        router.replace(`${pathname}?${newParams.toString()}`, {
          scroll: false,
        });
      }
    } else {
      // No initialYear provided, fall back to URL param
      const yearParam = searchParams.get("year");

      if (yearParam && yearParam !== selectedYear) {
        // Only update context if URL param exists and differs
        setSelectedYear(yearParam);
      } else if (
        !yearParam &&
        navigateOnChange &&
        selectedYear !== DEFAULT_YEAR
      ) {
        // If no year in URL but we have a non-default year in context, update URL
        const newParams = new URLSearchParams(searchParams);
        newParams.set("year", selectedYear);
        router.replace(`${pathname}?${newParams.toString()}`, {
          scroll: false,
        });
      }
    }
  }, [
    searchParams,
    selectedYear,
    setSelectedYear,
    router,
    pathname,
    navigateOnChange,
    initialYear,
  ]);

  // Handle year selection change
  const handleChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);

    // Wait until searchParams is resolved
    if (!searchParams) return;

    // Only update URL for media pages or if navigateOnChange is true
    if (
      pathname.includes("/movies") ||
      pathname.includes("/tv") ||
      navigateOnChange
    ) {
      // Create a new params object based on current params
      const newParams = new URLSearchParams(searchParams);
      newParams.set("year", newYear);

      // Replace URL with updated params
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
