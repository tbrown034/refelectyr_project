import Link from "next/link";
import HeroText from "./HeroText";
import HeroCTA from "./HeroCTA";
import ScrollingMovies from "./scrollingMedia/ScrollingMovies";
import ScrollingTV from "./scrollingMedia/ScrollingTV";
import { DEFAULT_YEAR } from "@/library/utils/defaults";
import HeroList from "./HeroList";
import HeroYearSelector from "./HeroYearSelector";

export default async function Hero({ searchParams }) {
  const year = searchParams?.year || DEFAULT_YEAR;

  return (
    <div className="flex flex-col gap-4">
      <HeroText />
      <HeroCTA />
      <HeroYearSelector />
      <ScrollingMovies year={year} />
      <ScrollingTV year={year} />
      <HeroList />
    </div>
  );
}
