import { getTvShows } from "@/Library/Api/tmdb";
import TvShowsList from "./TvShowsList";
import YearSelector from "@/Components/UI/YearSelector";
import { DEFAULT_YEAR } from "@/Contexts/YearContext";

export default async function TvShowsPage({
  searchParams: searchParamsPromise,
}) {
  // Next.js 15 treats searchParams as a Promise
  const searchParams = await searchParamsPromise;
  const selectedYear = searchParams?.year || DEFAULT_YEAR;

  const tvShows = await getTvShows({
    year: selectedYear,
    sortBy: "popularity.desc",
    limit: 20,
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">
        Top TV Shows of {selectedYear}
      </h1>
      <YearSelector />
      <TvShowsList shows={tvShows} />
    </div>
  );
}
