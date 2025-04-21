export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          {/* Outer circle */}
          <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
          {/* Animated arc */}
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-4 border-transparent border-l-blue-600 dark:border-l-blue-400 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold">Loading ReflectYr...</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Preparing your content
        </p>
      </div>
    </div>
  );
}
