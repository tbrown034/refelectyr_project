import Link from "next/link";
import { headers } from "next/headers";
import { SignInButton } from "@/components/ui/buttons/actions/SignInButton";
import HeroGetStarted from "./HeroButtons/HeroGetStarted";
import { auth } from "@/library/auth";

export default async function HeroCTA() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("[HeroCTA] Session:", session ? `User: ${session.user?.email}` : "No session");

  return (
    <div className="flex items-center text-center gap-4">
      <HeroGetStarted />
      {session?.user ? (
        <Link
          href="/profile"
          className="rounded-lg px-6 py-3 text-base font-semibold transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 active:scale-[0.98] cursor-pointer shadow-md transform bg-white dark:bg-slate-700 text-slate-700 border border-slate-400 hover:bg-slate-100 hover:border-slate-500 dark:text-slate-200 dark:border-slate-500 dark:hover:bg-slate-700 dark:hover:border-slate-400 hover:shadow-lg focus-visible:ring-slate-500"
        >
          View Profile
        </Link>
      ) : (
        <SignInButton
          className="flex items-center gap-3 rounded-lg px-6 py-3 text-base font-semibold transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 active:scale-[0.98] cursor-pointer shadow-md transform bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-gray-400 hover:shadow-lg focus-visible:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      )}
    </div>
  );
}
