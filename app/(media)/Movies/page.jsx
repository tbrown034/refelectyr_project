import { getMovies } from "@/Library/Api/tmdb";
import MoviesList from "./MoviesList";
import YearSelector from "@/Components/UI/YearSelector";

export default async function MoviesPage({
  searchParams: searchParamsPromise,
}) {
  // Next.js 19 treats searchParams as a Promise
  const searchParams = await searchParamsPromise;
  const selectedYear = searchParams?.year || "2025";

  const movies = await getMovies({
    year: selectedYear,
    sortBy: "popularity.desc",
    limit: 20,
  });

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Top 20 Movies of {selectedYear}
      </h1>
      <YearSelector />
      <MoviesList movies={movies} />
    </div>
  );
}
