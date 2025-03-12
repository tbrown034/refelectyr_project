import { getMovies } from "@/Library/Api/tmdb";
import MoviesList from "./MoviesList";
import YearSelector from "@/Components/UI/YearSelector";
import { DEFAULT_YEAR } from "@/Contexts/YearContext";

export default async function MoviesPage({
  searchParams: searchParamsPromise,
}) {
  // Next.js 15 treats searchParams as a Promise
  const searchParams = await searchParamsPromise;
  const selectedYear = searchParams?.year || DEFAULT_YEAR;

  const movies = await getMovies({
    year: selectedYear,
    sortBy: "popularity.desc",
    limit: 20,
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Top Movies of {selectedYear}</h1>
      <YearSelector />
      <MoviesList movies={movies} />
    </div>
  );
}
