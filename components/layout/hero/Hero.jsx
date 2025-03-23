// components/layout/hero/Hero.jsx
import YearSelector from "@/components/ui/inputs/YearSelector";
import HeroCTA from "./HeroCTA";
import HeroText from "./HeroText";
import ScrollingMovies from "./scrollingMedia/ScrollingMovies";
import ScrollingTV from "./scrollingMedia/ScrollingTV";

export default async function Hero({ searchParams }) {
  // Next.js 15: searchParams is now a Promise, must await it
  const params = await searchParams;

  // Read the year from the URL query parameters if provided; default to "2025"
  const year = params?.year || "2025";

  return (
    <div className="flex flex-col items-center">
      {/* Hero text section with fixed width */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
        <HeroText />
        <div className="my-6">
          <YearSelector
            initialYear={year}
            navigateOnChange={false}
            className="w-full max-w-xs"
          />
        </div>
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
