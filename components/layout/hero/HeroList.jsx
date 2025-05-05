import Link from "next/link";
import { ListBulletIcon } from "@heroicons/react/24/solid";

export default function HeroList() {
  return (
    <Link
      href="/lists"
      className="inline-flex items-center gap-3 rounded-lg px-6 py-3 text-base font-semibold transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 active:scale-[0.98] cursor-pointer shadow-md transform bg-white dark:bg-slate-700 text-slate-700 border border-slate-400 hover:bg-slate-100 hover:border-slate-500 dark:text-slate-200 dark:border-slate-500 dark:hover:bg-slate-700 dark:hover:border-slate-400 hover:shadow-lg focus-visible:ring-slate-500"
    >
      <ListBulletIcon className="h-6 w-6" />
      <span className="font-medium">View My Lists</span>
    </Link>
  );
}
