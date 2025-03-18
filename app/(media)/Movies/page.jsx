import { getMovies } from "library/Api/tmdb";
import MoviesList from "./MoviesList";
import YearSelector from "components/UI/YearSelector";
import { DEFAULT_YEAR } from "library/Contexts/YearContext";

export default async function MoviesPage({
  searchParams: searchParamsPromise,
}) {
  // Next.js 15 treats searchParams as a Promise
  const searchParams = await searchParamsPromise;
  const selectedYear = searchParams?.year || DEFAULT_YEAR;

  // Fetch data with the year
  const movies = await getMovies({
    year: selectedYear,
    sortBy: "popularity.desc",
    limit: 20,
  });

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">Top Movies of {selectedYear}</h1>
        <div className="w-full md:w-48">
          <YearSelector initialYear={selectedYear} />
        </div>
      </div>

      <MoviesList movies={movies} />
    </div>
  );
}
