"use client";

import { use } from "react";
import { YearContext } from "@/library/contexts/YearContext";
import YearSelector from "@/components/ui/inputs/YearSelector";

export default function HeroYearSelector({ initialYear = null }) {
  const { selectedYear, setSelectedYear } = use(YearContext);

  const handleYearChange = (newYear) => {
    setSelectedYear(newYear);
  };

  return (
    <div className="flex flex-col items-start gap-1 mb-6 px-4">
      <label
        htmlFor="year-selector"
        className="text-sm font-medium text-blue-200"
      >
        Year
      </label>
      <div className="relative flex items-center">
        <YearSelector
          initialYear={initialYear}
          navigateOnChange={true}
          onYearChange={handleYearChange}
          className="appearance-none rounded-lg border border-blue-500 bg-blue-950/50 dark:bg-blue-950/40 text-white px-4 py-3 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
        />
        <div className="pointer-events-none absolute right-3">
          <svg
            className="h-4 w-4 text-blue-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 8l4 4 4-4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
