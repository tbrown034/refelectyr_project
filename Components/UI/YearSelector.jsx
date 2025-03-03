"use client"; // ✅ This needs to be a Client Component

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function YearSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYear = searchParams.get("year") || "2025"; // ✅ Default to 2025

  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    setSelectedYear(currentYear); // ✅ Keep dropdown in sync with URL changes
  }, [currentYear]);

  const handleChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);

    // ✅ Update the URL dynamically (keeps the app fast, no full page reload)
    const params = new URLSearchParams(searchParams);
    params.set("year", newYear);
    router.push(`/movies?${params.toString()}`);
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
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
    </div>
  );
}
