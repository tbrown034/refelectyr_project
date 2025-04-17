// components/layout/hero/Hero.jsx
import HeroCTA from "./HeroCTA";
import HeroText from "./HeroText";
import HeroYearSelector from "./HeroYearSelector";
import ScrollingMovies from "./scrollingMedia/ScrollingMovies";
import ScrollingTV from "./scrollingMedia/ScrollingTV";
import { DEFAULT_YEAR } from "@/library/utils/defaults";

export default async function Hero({ searchParams }) {
  const year = searchParams?.year || DEFAULT_YEAR;

  return (
    <div className="flex flex-col items-center ">
      {/* Hero text section with fixed width */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
        <HeroText />
        <HeroYearSelector initialYear={year} />
        <HeroCTA year={year} />
      </div>

      {/* Full-width scrolling sections */}
      <div className="w-full px-4 py-6 space-y-12">
        <ScrollingMovies year={year} />
        <ScrollingTV year={year} />
      </div>
    </div>
  );
}
