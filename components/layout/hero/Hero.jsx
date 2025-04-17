import HeroCTA from "./HeroCTA";
import HeroText from "./HeroText";
import HeroYearSelector from "./HeroYearSelector";
import ScrollingMovies from "./scrollingMedia/ScrollingMovies";
import ScrollingTV from "./scrollingMedia/ScrollingTV";
import { DEFAULT_YEAR } from "@/library/utils/defaults";

export default async function Hero({ searchParams }) {
  const year = searchParams?.year || DEFAULT_YEAR;

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900/50 min-h-screen">
      {/* Hero content section */}
      <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20 flex flex-col items-center">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <HeroText />
          <HeroYearSelector initialYear={year} />
          <HeroCTA year={year} />
        </div>
      </div>

      {/* Full-width scrolling sections */}
      <div className="w-full px-4 py-8 md:py-12 space-y-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg">
        <ScrollingMovies year={year} />
        <ScrollingTV year={year} />
      </div>
    </div>
  );
}
