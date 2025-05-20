import { auth } from "@/auth";
import { SignInButton } from "@/components/ui/buttons/actions/SignInButton";
import { SignOut } from "@/components/ui/buttons/actions/SignOutButton";

export default async function Profile() {
  const session = await auth();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg bg-white dark:bg-gray-900 shadow-md">
      {session?.user ? (
        <div className="space-y-4 text-center">
          <img
            src={session.user.image}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mx-auto"
          />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {session.user.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {session.user.email}
          </p>
          <div className="pt-2">
            <SignOut />
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-gray-700 dark:text-gray-200">
            You're not signed in.
          </p>
          <div className="pt-2">
            <SignInButton />
          </div>
        </div>
      )}
    </div>
  );
}
