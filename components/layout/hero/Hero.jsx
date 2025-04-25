import Link from "next/link";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import HeroText from "./HeroText";
import HeroYearSelector from "./HeroYearSelector";
import HeroCTA from "./HeroCTA";
import HeroAddButtons from "./HeroAddButtons";
import ScrollingMovies from "./scrollingMedia/ScrollingMovies";
import ScrollingTV from "./scrollingMedia/ScrollingTV";
import { DEFAULT_YEAR } from "@/library/utils/defaults";
import HeroList from "./HeroList";

export default async function Hero({ searchParams }) {
  const year = searchParams?.year || DEFAULT_YEAR;

  return (
    <div className="flex flex-col gap-4">
      <HeroText />
      <HeroCTA />
      <HeroYearSelector initialYear={year} className="mt-6" />
      <ScrollingMovies year={year} />
      <ScrollingTV year={year} />
      <HeroList />
    </div>
  );
}
