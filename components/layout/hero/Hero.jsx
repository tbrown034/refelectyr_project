import Link from "next/link";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import HeroText from "./HeroText";
import HeroYearSelector from "./HeroYearSelector";
import HeroCTA from "./HeroCTA";
import HeroAddButtons from "./HeroAddButtons";
import ScrollingMovies from "./scrollingMedia/ScrollingMovies";
import ScrollingTV from "./scrollingMedia/ScrollingTV";
import { DEFAULT_YEAR } from "@/library/utils/defaults";

export default async function Hero({ searchParams }) {
  const year = searchParams?.year || DEFAULT_YEAR;

  return (
    <div className="min-h-screen px-4 lg:px-8 xl:px-16 max-w-screen-2xl mx-auto py-8">
      <div className="text-center flex flex-col gap-8">
        <HeroText />
        <HeroAddButtons />
        <HeroCTA />
        <HeroYearSelector initialYear={year} />
        <div className="mt-12 flex flex-col gap-8">
          <ScrollingMovies year={year} />
          <ScrollingTV year={year} />
        </div>
        <div className="mt-8">
          <Link
            href="/lists"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-color transition-transform duration-300"
          >
            <ListBulletIcon className="h-6 w-6" />
            <span className="font-medium">View My Lists</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
