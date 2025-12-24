import HeroText from "./HeroText";
import HeroCTA from "./HeroCTA";
import ScrollingMovies from "./scrollingMedia/ScrollingMovies";
// NOTE: TV kept in code but hidden from UI for movie-focused MVP
// import ScrollingTV from "./scrollingMedia/ScrollingTV";
import { DEFAULT_YEAR } from "@/library/utils/defaults";
import HeroList from "./HeroList";

export default async function Hero({ searchParams }) {
  const year = searchParams?.year || DEFAULT_YEAR;

  return (
    <>
      <div className="flex flex-col gap-6 justify-center items-center p-2 mt-4">
        <HeroText />
        <HeroCTA />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center p-2 mt-4">
        <ScrollingMovies year={year} />
        {/* NOTE: TV kept in code but hidden from UI for movie-focused MVP */}
        {/* <ScrollingTV year={year} /> */}
        <div className="mb-16 mt-4">
          <HeroList />
        </div>
      </div>
    </>
  );
}
