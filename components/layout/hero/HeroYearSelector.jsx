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
    <div className="flex flex-col gap-4 p-4 border border-slate-300 dark:border-slate-700 rounded-lg bg-transparent">
      <header className="flex flex-col gap-2">
        <h2 className="flex items-center gap-4 text-2xl font-semibold text-slate-800 dark:text-slate-100">
          {/* CalendarDaysIcon is not imported, add it */}
          <CalendarDaysIcon className="h-8 w-8 text-slate-500 dark:text-slate-300" />
          Choose a Year
        </h2>
        <p className=" text-xl font-semibold text-slate-600 dark:text-slate-400 leading-snug">
          Set your default year for browsing and adding movies or shows.
        </p>
      </header>
      <div className="flex justify-center">
        <YearSelector
          initialYear={initialYear}
          navigateOnChange={true}
          onYearChange={handleYearChange}
          className="mt-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-800 dark:text-slate-100 py-2 pl-3 pr-10 shadow-sm"
        />
      </div>
    </div>
  );
}

import { CalendarDaysIcon } from "@heroicons/react/24/solid";
