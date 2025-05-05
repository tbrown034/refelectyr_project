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
    <section className="w-full max-w-md mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 shadow-lg text-white">
      <header className="mb-4">
        <h2 className="text-lg font-semibold tracking-wide">Select a Year</h2>
        <p className="text-sm opacity-80">
          Choose a year to explore and build your list.
        </p>
      </header>
      <YearSelector
        initialYear={initialYear}
        navigateOnChange={true}
        onYearChange={handleYearChange}
        className="w-full rounded-lg border border-white/40 bg-white/20 text-white px-5 py-3 pr-12 text-base shadow-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white transition"
      />
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
        <svg
          className="h-6 w-6 text-white/80"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
        </svg>
      </div>
    </section>
  );
}
