import { getTvShows } from "@/Library/Api/tmdb";
import TvShowsList from "./TvShowsList";
import YearSelector from "@/Components/UI/YearSelector";

export default async function TvShowsPage({
  searchParams: searchParamsPromise,
}) {
  const searchParams = await searchParamsPromise;
  const selectedYear = searchParams?.year || "2025";

  const tvShows = await getTvShows({
    year: selectedYear,
    sortBy: "popularity.desc",
    limit: 20,
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        Top 20 TV Shows of {selectedYear}
      </h1>
      <YearSelector />
      <TvShowsList shows={tvShows} />
    </div>
  );
}
