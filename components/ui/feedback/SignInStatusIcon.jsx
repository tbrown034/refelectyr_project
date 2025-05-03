import { auth } from "@/auth";
import { UserIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function SignInStatusIcon() {
  const session = await auth();
  const isSignedIn = !!session?.user;

  const iconSize = "w-5 h-5"; // Slightly smaller icon to fit better in the button

  return (
    <Link
      href="/profile"
      // Button styling: border, padding, rounded corners, transitions, hover/active states
      className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-400 dark:border-slate-600
                  dark:bg-slate-800
                 hover:bg-slate-100 dark:hover:bg-slate-700
                 active:bg-slate-200 dark:active:bg-slate-600
                 transition-colors duration-150 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
    >
      {isSignedIn ? (
        <>
          <UserCircleIcon
            className={`${iconSize} text-blue-600 dark:text-blue-400`}
            title="Go to Profile"
          />
          {/* Adjusted text color for better contrast on button background */}
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Profile
          </span>
        </>
      ) : (
        <>
          <UserIcon
            className={`${iconSize} text-slate-500 dark:text-slate-400`}
            title="Go to Sign In"
          />
          {/* Adjusted text color for better contrast on button background */}
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Sign In
          </span>
        </>
      )}
    </Link>
  );
}
