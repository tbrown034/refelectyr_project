import Link from "next/link";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import HeroText from "./HeroText";
import HeroYearSelector from "./HeroYearSelector";
import HeroCTA from "./HeroAddButtons";
import ScrollingMovies from "./scrollingMedia/ScrollingMovies";
import ScrollingTV from "./scrollingMedia/ScrollingTV";
import { DEFAULT_YEAR } from "@/library/utils/defaults";
import HeroAddButtons from "./HeroAddButtons";

export default async function Hero({ searchParams }) {
  const year = searchParams?.year || DEFAULT_YEAR;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center space-y-8">
          <HeroText />
          <HeroYearSelector initialYear={year} />
          <HeroCTA />
          {/* Scrolling Sections */}
          <div className="mt-12 space-y-8">
            <ScrollingMovies year={year} />
            <ScrollingTV year={year} />
          </div>
          {/* View Lists CTA */}
          <div className="mt-8">
            <Link
              href="/lists"
              className="inline-flex items-center gap-3 px-6 py-3
              bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200
              rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700
              transition-colors shadow-md"
            >
              <ListBulletIcon className="h-6 w-6" />
              <span className="font-medium">View My Lists</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
