"use client";

import Link from "next/link";

export default function HeroAddButtons({ year = "2025" }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 mt-8">
      <Link
        href={`/movies?year=${year}`}
        className="rounded-lg px-6 py-3 text-base font-semibold transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 active:scale-[0.98] cursor-pointer shadow-md transform bg-gradient-to-br from-blue-500 to-blue-700 text-white border border-transparent hover:from-blue-600 hover:to-blue-800 hover:shadow-lg focus-visible:ring-blue-500"
      >
        Add Movies
      </Link>
      <Link
        href={`/tv?year=${year}`}
        className="rounded-lg px-6 py-3 text-base font-semibold transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 active:scale-[0.98] cursor-pointer shadow-md transform bg-white dark:bg-slate-800 text-slate-700 border border-slate-400 hover:bg-slate-100 hover:border-slate-500 dark:text-slate-300 dark:border-slate-500 dark:hover:bg-slate-700 dark:hover:border-slate-400 hover:shadow-lg focus-visible:ring-slate-500"
      >
        Add TV Shows
      </Link>
    </div>
  );
}
