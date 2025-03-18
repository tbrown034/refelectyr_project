// Components/Layout/Hero/HeroCTA.jsx
"use client";

import Link from "next/link";
import { use } from "react";
import { YearContext } from "@/Contexts/YearContext";
import PrimaryButton from "@/Components/UI/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/UI/Buttons/SecondaryButton";

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
