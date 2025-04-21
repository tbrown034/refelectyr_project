// app/not-found.js
import Link from "next/link";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-300 dark:bg-slate-800 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-6">
            <MagnifyingGlassIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're sorry, but the page you're looking for doesn't exist or has
            been moved.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
