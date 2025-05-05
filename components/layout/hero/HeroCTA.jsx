import Link from "next/link";
import { SignInButton } from "@/components/ui/buttons/actions/SignInButton";
import HeroGetStarted from "./HeroButtons/HeroGetStarted";
import { auth } from "../../../auth.js";

export default async function HeroCTA() {
  const session = await auth();

  return (
    <div className="flex items-center text-center gap-4 ">
      <HeroGetStarted />
      {session?.user ? (
        <Link
          href="/profile"
          className="rounded-lg px-6 py-3 text-base font-semibold transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 active:scale-[0.98] cursor-pointer shadow-md transform bg-white dark:bg-slate-700 text-slate-700 border border-slate-400 hover:bg-slate-100 hover:border-slate-500 dark:text-slate-200 dark:border-slate-500 dark:hover:bg-slate-700 dark:hover:border-slate-400 hover:shadow-lg focus-visible:ring-slate-500"
        >
          View Profile
        </Link>
      ) : (
        <SignInButton className="rounded-lg px-6 py-3 text-base font-semibold transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 active:scale-[0.98] cursor-pointer shadow-md transform bg-gradient-to-br from-blue-500 to-blue-700 text-white border border-transparent hover:from-blue-600 hover:to-blue-800 hover:shadow-lg focus-visible:ring-blue-500" />
      )}
    </div>
  );
}
