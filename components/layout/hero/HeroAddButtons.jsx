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
    <div className="flex flex-row gap-4 px-4 w-full max-w-xl mx-auto">
      <button
        onClick={handleAddMovies}
        className="flex-1 rounded-xl px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
      >
        Add Movies
      </button>
      <button
        onClick={handleAddTvShows}
        className="flex-1 rounded-xl px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95 transition-all cursor-pointer"
      >
        Add TV Shows
      </button>
    </div>
  );
}
