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
        className="flex-1 rounded-xl p-4  hover:bg-blue-700 active:scale-95 transition-all bg-blue-600 text-white font-medium cursor-pointer border-4 border-blue-600  "
      >
        Add Movies
      </button>
      <button
        onClick={handleAddTvShows}
        className="flex-1 rounded-xl p-4 border-4 border-gray-600 cursor-pointer hover:bg-gray-700 active:scale-95 transition-all "
      >
        Add TV Shows
      </button>
    </div>
  );
}
