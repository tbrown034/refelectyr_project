"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { YearContext, DEFAULT_YEAR } from "@/Contexts/YearContext";

export default function YearSelector({ navigateOnChange = true }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Use traditional useContext for compatibility
  const { selectedYear, setSelectedYear, isInitialized } =
    useContext(YearContext);

  // Get the year from URL params
  const urlYear = searchParams.get("year");

  // Effect to sync context with URL and vice versa
  useEffect(() => {
    // Only run once the context is initialized from localStorage
    if (!isInitialized) return;

    // For media pages (/movies or /tv), URL params take priority
    if ((pathname === "/movies" || pathname === "/tv") && urlYear) {
      // If URL has a year and it's different from context, update context
      if (urlYear !== selectedYear) {
        setSelectedYear(urlYear);
      }
    }
    // If we're on a media page but no year in URL, add the context year to URL
    else if ((pathname === "/movies" || pathname === "/tv") && !urlYear) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("year", selectedYear);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [
    pathname,
    searchParams,
    selectedYear,
    setSelectedYear,
    router,
    urlYear,
    isInitialized,
  ]);

  // Handle year selection change
  const handleChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);

    // Update URL for media pages or if navigateOnChange is true
    if (pathname === "/movies" || pathname === "/tv" || navigateOnChange) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("year", newYear);

      // Use replace to avoid adding to history stack for simple filter changes
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  // Years to display in the dropdown (2000-2025)
  const years = Array.from({ length: 26 }, (_, index) =>
    (2000 + index).toString()
  );

  return (
    <div className="mb-4">
      <label
        htmlFor="year"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Select Year:
      </label>
      <select
        id="year"
        name="year"
        value={selectedYear}
        onChange={handleChange}
        className="mt-1 px-4 p-2 border border-gray-300 dark:border-gray-700 rounded-lg
                 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
