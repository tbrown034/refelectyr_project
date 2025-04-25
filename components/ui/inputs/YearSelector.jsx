"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

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

  const [selectedYear, setSelectedYear] = useState(() => {
    const yearFromURL = searchParams.get("year");
    return controlledYear || initialYear || yearFromURL || endYear.toString();
  });

  const handleYearChange = useCallback(
    (newYear) => {
      setSelectedYear(newYear);
      onYearChange?.(newYear);

      if (navigateOnChange) {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("year", newYear);
        router.replace(`${pathname}?${newParams}`, { scroll: false });
      }
    },
    [navigateOnChange, onYearChange, pathname, router, searchParams]
  );

  useEffect(() => {
    if (controlledYear && controlledYear !== selectedYear) {
      setSelectedYear(controlledYear);
    }
  }, [controlledYear, selectedYear]);

  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) =>
    (startYear + index).toString()
  ).reverse();

  return (
    <select
      id="year-selector"
      name="year"
      value={selectedYear}
      onChange={(e) => handleYearChange(e.target.value)}
      className={className}
      aria-label="Select content year"
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
