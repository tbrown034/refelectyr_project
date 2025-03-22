"use client";

import { useEffect, useContext } from "react";
import { YearContext } from "@/library/contexts/YearContext";
import { DEFAULT_YEAR } from "@/library/utils/defaults";

// This is a client component solely responsible for resetting the year
export default function HomeYearReset() {
  const { setSelectedYear } = useContext(YearContext);

  // Force reset to default year when landing on homepage
  useEffect(() => {
    setSelectedYear(DEFAULT_YEAR);
  }, [setSelectedYear]);

  // This component doesn't render anything
  return null;
}
