"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { YearContext } from "@/Contexts/YearContext"; // Updated import path

export default function YearSelector({ navigateOnChange = true }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Use traditional useContext instead of use() hook for better compatibility
  const { selectedYear, setSelectedYear } = useContext(YearContext);

  // Effect to sync URL year with context when needed
  useEffect(() => {
    const urlYear = searchParams.get("year");
    // For media pages, if URL has a year parameter, sync it with context
    if (pathname !== "/" && urlYear && urlYear !== selectedYear) {
      setSelectedYear(urlYear);
    }
  }, [pathname, searchParams, selectedYear, setSelectedYear]);

  // Handle year selection change
  const handleChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);

    // Only update URL if we're on a media page or if navigateOnChange is true
    if (pathname !== "/" || navigateOnChange) {
      // Create new URLSearchParams object and update
      const params = new URLSearchParams(searchParams.toString());
      params.set("year", newYear);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

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
        className="mt-1 px-4 p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      >
        {[...Array(26)].map((_, index) => {
          const year = 2000 + index;
          return (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          );
        })}
      </select>
    </div>
  );
}
