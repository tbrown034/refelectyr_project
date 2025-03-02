import { EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const HeaderBranding = () => (
  <Link
    href="/"
    className="flex gap-2 items-center p-2 rounded-lg  dark:border-white
        cursor-pointer hover:bg-slate-300 active:bg-slate-500
        transition duration-200 ease-in-out"
  >
    <h1 className="text-xl font-bold">ReflectYr</h1>
    <EyeIcon className="w-6 h-6 text-gray-900 dark:text-white" />
  </Link>
);

export default HeaderBranding;
