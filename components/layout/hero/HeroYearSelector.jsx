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
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 animate-fade-in">
        <div className="flex-1">
          <p className=" mb-1">Select Year</p>
          <p className="text-sm text-white/80 ">
            Choose a year to explore and build your list.
          </p>
        </div>
        <div className="relative w-full sm:w-56 mt-2 sm:mt-0">
          <YearSelector
            initialYear={initialYear}
            navigateOnChange={true}
            onYearChange={handleYearChange}
            className="appearance-none w-full rounded-md border border-blue-500 bg-blue-950/60 dark:bg-blue-950/50 text-white px-4 py-3 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
          />
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="h-5 w-5 text-blue-300"
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
    </div>
  );
}
