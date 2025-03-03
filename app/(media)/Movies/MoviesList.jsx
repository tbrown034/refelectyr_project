"use client"; // ✅ This makes it a Client Component

export default function MoviesList({ movies }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          onClick={() => alert(`Selected: ${movie.title}`)} // ✅ Make items clickable
        >
          <h2 className="text-lg font-semibold">{movie.title}</h2>
        </li>
      ))}
    </ul>
  );
}
