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
    <div className="flex flex-row gap-4 px-4">
      <button
        onClick={handleAddMovies}
        className="rounded-xl p-3 px-6 text-lg bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white font-semibold border-4 border-blue-600 shadow-md"
      >
        Add Movies
      </button>
      <button
        onClick={handleAddTvShows}
        className="rounded-xl p-3 px-6 text-lg border-4 border-gray-600 hover:bg-gray-700 active:scale-95 transition-all font-medium"
      >
        Add TV Shows
      </button>
    </div>
  );
}
