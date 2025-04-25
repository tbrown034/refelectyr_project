import Link from "next/link";
import { ListBulletIcon } from "@heroicons/react/24/solid";

export default function HeroList() {
  return (
    <div>
      {" "}
      <div className="mt-8">
        <Link
          href="/lists"
          className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-color transition-transform duration-300"
        >
          <ListBulletIcon className="h-6 w-6" />
          <span className="font-medium">View My Lists</span>
        </Link>
      </div>
    </div>
  );
}
