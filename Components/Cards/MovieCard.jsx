"use client"; // Mark as client component for onClick functionality

export default function MovieCard({ movie }) {
  return (
    <li
      className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      onClick={() => alert(`Selected: ${movie.title}`)}
    >
      <h2 className="text-lg font-semibold">{movie.title}</h2>
      {/* Add more movie details here */}
    </li>
  );
}
