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
    <div className="flex flex-col items-center justify-center space-y-2  px-4">
      <label
        htmlFor="year-selector"
        className="text-xl text-blue-950 dark:text-blue-200 font-bold "
      >
        Select Your Reflection Year
      </label>
      <div className="w-full max-w-xs">
        <YearSelector
          initialYear={initialYear}
          navigateOnChange={true}
          className="w-full"
          onYearChange={handleYearChange}
        />
      </div>
    </div>
  );
}
