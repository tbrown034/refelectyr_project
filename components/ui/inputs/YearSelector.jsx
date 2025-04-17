"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function YearSelector({
  navigateOnChange = true,
  startYear = 2000,
  endYear = new Date().getFullYear(),
  className = "",
  initialYear = null,
  onYearChange = null,
  selectedYear: controlledYear = null,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine the initial year
  const [selectedYear, setSelectedYear] = useState(() => {
    // Priority: controlledYear > initialYear > URL param > current year
    const yearFromURL = searchParams.get("year");
    return controlledYear || initialYear || yearFromURL || endYear.toString();
  });

  // Memoized change handler to minimize re-renders
  const handleYearChange = useCallback(
    (newYear) => {
      // Update local state
      setSelectedYear(newYear);

      // Call external change handler if provided
      onYearChange?.(newYear);

      // Navigate if needed
      if (navigateOnChange) {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("year", newYear);
        router.replace(`${pathname}?${newParams}`, { scroll: false });
      }
    },
    [navigateOnChange, onYearChange, pathname, router, searchParams]
  );

  // Sync with controlled year if provided
  useEffect(() => {
    if (controlledYear && controlledYear !== selectedYear) {
      setSelectedYear(controlledYear);
    }
  }, [controlledYear, selectedYear]);

  // Generate years array
  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) =>
    (startYear + index).toString()
  ).reverse();

  return (
    <div className={`relative  ${className}`}>
      <div className="relative">
        <select
          id="year-selector"
          name="year"
          value={selectedYear}
          onChange={(e) => handleYearChange(e.target.value)}
          className={`
            block w-full appearance-none
            rounded-xl
            border-2 border-blue-600 dark:border-blue-500
            bg-white dark:bg-white
            px-5 py-3
            text-blue-600 dark:text-blue-600
            font-semibold
            text-lg
            hover:bg-blue-50
            focus:outline-none
            focus:ring-4 focus:ring-blue-200/50
            cursor-pointer
            shadow-md
            transition-all duration-300 ease-in-out
          `}
          aria-label="Select content year"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          className="
          pointer-events-none
          absolute
          inset-y-0
          right-4
          my-auto
          h-6 w-6
          text-blue-600
          dark:text-blue-600
        "
        />
      </div>
    </div>
  );
}
