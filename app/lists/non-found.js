// app/lists/not-found.js
import Link from "next/link";
import { HomeIcon, ListBulletIcon } from "@heroicons/react/24/solid";

export default function ListsNotFound() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-6">
            <ListBulletIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>

          <h1 className="text-2xl font-bold mb-4">List Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            We couldn't find the list you're looking for. It may have been
            deleted or the URL might be incorrect.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/lists"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ListBulletIcon className="h-5 w-5" />
              <span>View All Lists</span>
            </Link>

            <Link
              href="/"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
