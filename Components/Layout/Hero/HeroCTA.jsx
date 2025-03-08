"use client";

import Link from "next/link";
import PrimaryButton from "@/Components/UI/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/UI/Buttons/SecondaryButton";

const HeroCTA = () => {
  return (
    <div className="flex  gap-2">
      <Link className="flex gap-4" href="/movies">
        <PrimaryButton text="Movies" />
      </Link>
      <Link className="flex gap-4" href="/tv">
        <SecondaryButton text="TV Shows" />
      </Link>
    </div>
  );
};

export default HeroCTA;
