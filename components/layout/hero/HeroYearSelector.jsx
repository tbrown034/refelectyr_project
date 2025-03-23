// components/layout/hero/HeroYearSelector.jsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import YearSelector from "@/components/ui/inputs/YearSelector";

export default function HeroYearSelector({ initialYear }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleYearChange = (newYear) => {
    // Update the URL with the new year
    const params = new URLSearchParams(window.location.search);
    params.set("year", newYear);

    // Use router.refresh() to trigger a server re-render without a full page refresh
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    router.refresh();
  };

  return (
    <div className="my-6">
      <YearSelector
        initialYear={initialYear}
        navigateOnChange={false} // We handle navigation separately
        className="w-full max-w-xs"
        onYearChange={handleYearChange}
      />
    </div>
  );
}
