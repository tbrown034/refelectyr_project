"use client";

import { useRouter, usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { YearContext, DEFAULT_YEAR } from "@/Contexts/YearContext";

export default function YearSelector({ navigateOnChange = true }) {
  const router = useRouter();
  const pathname = usePathname();

  // Use traditional useContext for compatibility
  const { selectedYear, setSelectedYear, isInitialized } =
    useContext(YearContext);

  // Handle year selection change
  const handleChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);

    // Only update URL for media pages or if navigateOnChange is true
    if (pathname === "/movies" || pathname === "/tv" || navigateOnChange) {
      // IMPORTANT: Create a new clean URL with just the year parameter
      router.replace(`${pathname}?year=${newYear}`, { scroll: false });
    }
  };

  // Years to display in the dropdown (2000-2025)
  const years = Array.from({ length: 26 }, (_, index) =>
    (2000 + index).toString()
  );

  return (
    <div className="mb-4">
      <label
        htmlFor="year-selector"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Select Year:
      </label>
      <select
        id="year-selector"
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
