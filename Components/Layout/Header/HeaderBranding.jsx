import { EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const HeaderBranding = () => (
  <Link href="/" className="flex gap-2 items-center">
    <h1 className="text-xl font-bold">ReflectYr</h1>
    <EyeIcon className="w-6 h-6 text-gray-900 dark:text-white" />
  </Link>
);

export default HeaderBranding;
