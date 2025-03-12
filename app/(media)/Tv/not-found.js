import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">TV Show Not Found</h1>
      <p className="text-xl mb-8">
        The TV show you're looking for doesn't exist or couldn't be loaded.
      </p>
      <Link
        href="/tv"
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-4"
      >
        <span>Back to TV Shows</span>
      </Link>
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <HomeIcon className="h-5 w-5" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
