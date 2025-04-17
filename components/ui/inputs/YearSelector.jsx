"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { use, useEffect, useRef } from "react";
import { YearContext } from "@/library/contexts/YearContext";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function YearSelector({
  navigateOnChange = true,
  startYear = 2000,
  endYear = new Date().getFullYear(),
  className = "",
  initialYear = null,
  onYearChange = null,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { selectedYear, setSelectedYear, isInitialized } = use(YearContext);

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current || !isInitialized) return;

    const yearFromURL = searchParams.get("year");
    const effectiveYear = initialYear || yearFromURL || selectedYear;

    if (effectiveYear !== selectedYear) {
      setSelectedYear(effectiveYear);
      onYearChange?.(effectiveYear);
    }

    if (navigateOnChange && yearFromURL !== effectiveYear) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("year", effectiveYear);
      router.replace(`${pathname}?${newParams}`, { scroll: false });
    }

    hasInitialized.current = true;
  }, [
    searchParams,
    initialYear,
    selectedYear,
    setSelectedYear,
    router,
    pathname,
    navigateOnChange,
    isInitialized,
    onYearChange,
  ]);

  const handleChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    onYearChange?.(newYear);

    if (navigateOnChange) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("year", newYear);
      router.replace(`${pathname}?${newParams}`, { scroll: false });
    }
  };

  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) =>
    (startYear + index).toString()
  ).reverse();

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <label
        htmlFor="year-selector"
        className="
          block
          mb-3
          text-base
          font-semibold
          text-slate-700
          dark:text-slate-200
          text-center
        "
      >
        Select Your Reflection Year
      </label>
      <div className="relative">
        <select
          id="year-selector"
          name="year"
          value={selectedYear}
          onChange={handleChange}
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
