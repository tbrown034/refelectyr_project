"use client";

export default function HeroAddButtons({
  year = "2025",
  onAddMovies,
  onAddTvShows,
}) {
  const handleAddMovies = () => {
    window.location.href = `/movies?year=${year}`;
  };

  const handleAddTvShows = () => {
    window.location.href = `/tv?year=${year}`;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 w-full max-w-md mx-auto">
      <button
        onClick={handleAddMovies}
        className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Movies
      </button>
      <button
        onClick={handleAddTvShows}
        className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add TV Shows
      </button>
    </div>
  );
}
