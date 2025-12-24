// app/lists/[type]/recommendations/[listId]/RecommendationsHeader.jsx
export default function RecommendationsHeader({ originalList, pageTypeLabel }) {
  // Format the list title or use default
  const originalTitle =
    originalList?.title ||
    `My Top ${pageTypeLabel === "Movie" ? "Movies" : "TV Shows"}`;

  return (
    <div className="p-6 border-b dark:border-gray-700 bg-linear-to-r from-purple-500 to-blue-500">
      <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
        Recommended {pageTypeLabel}s
      </h1>
      <p className="text-white opacity-90">
        Based on your list:{" "}
        <span className="font-semibold">{originalTitle}</span>
      </p>
    </div>
  );
}
