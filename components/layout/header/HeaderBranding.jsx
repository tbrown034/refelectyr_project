// components/layout/header/HeaderBranding.jsx
import { EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const HeaderBranding = () => (
  <Link href="/" className="flex gap-2 items-center p-2 rounded-lg">
    <h1 className="text-xl font-bold hover:underline">ReflectYr</h1>
    <EyeIcon className="w-6 h-6 text-gray-900 dark:text-white" />
  </Link>
);

export default HeaderBranding;
