// app/(media)/tv/page.jsx
import { getTvShows } from "@/library/api/tmdb";
import TvShowsList from "./TvShowsList";
import YearSelector from "@/components/ui/inputs/YearSelector";
import { DEFAULT_YEAR } from "@/library/utils/defaults";

export default async function TvShowsPage({ searchParams }) {
  // Next.js 15: searchParams is now a Promise, must await it
  const params = await searchParams;
  const selectedYear = params?.year || DEFAULT_YEAR;

  const tvShows = await getTvShows({
    year: selectedYear,
    sortBy: "popularity.desc",
    limit: 20,
  });

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">Top TV Shows of {selectedYear}</h1>
        <div className="w-full md:w-48">
          <YearSelector initialYear={selectedYear} />
        </div>
      </div>

      <TvShowsList shows={tvShows} />
    </div>
  );
}
