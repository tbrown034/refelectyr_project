// Components/Layout/Hero/HeroCTA.jsx
"use client";

import Link from "next/link";
import { use } from "react";
import { YearContext } from "@/library/contexts/YearContext";
import PrimaryButton from "@/components/ui/buttons/general/PrimaryButton";
import SecondaryButton from "@/components/ui/buttons/general/SecondaryButton";

const HeroCTA = () => {
  const { selectedYear } = use(YearContext);

  return (
    <div className="flex gap-2">
      <Link href={`/movies?year=${selectedYear}`}>
        <PrimaryButton text="Movies" />
      </Link>
      <Link href={`/tv?year=${selectedYear}`}>
        <SecondaryButton text="TV Shows" />
      </Link>
    </div>
  );
};

export default HeroCTA;
