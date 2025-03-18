// components/ui/buttons/ListToggleButton.jsx
export default function ListToggleButton({
  isOpen,
  toggleSidebar,
  activeTab,
  count,
}) {
  const toggleBtnClasses = `fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg
      ${isOpen ? "bg-gray-700 text-white" : "bg-blue-600 text-white"}
      transition-all duration-300 hover:scale-105`;

  return (
    <button
      onClick={toggleSidebar}
      className={toggleBtnClasses}
      aria-label={isOpen ? "Close my lists" : "Open my lists"}
    >
      {isOpen ? (
        <XMarkIcon className="h-6 w-6" />
      ) : (
        <>
          {count > 0 ? (
            // Show a different icon if they have both types
            count >
            (activeTab === "movies" ? movieList.length : tvList.length) ? (
              <ListIcon className="h-6 w-6" />
            ) : activeTab === "movies" ? (
              <FilmIcon className="h-6 w-6" />
            ) : (
              <TvIcon className="h-6 w-6" />
            )
          ) : activeTab === "movies" ? (
            <FilmIcon className="h-6 w-6" />
          ) : (
            <TvIcon className="h-6 w-6" />
          )}
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </>
      )}
    </button>
  );
}
