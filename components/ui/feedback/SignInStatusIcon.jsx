import { auth } from "@/auth";
import { UserIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default async function SignInStatusIcon() {
  const session = await auth();
  const isSignedIn = !!session?.user;

  return (
    <div className="relative w-6 h-6">
      {isSignedIn ? (
        <UserCircleIcon
          className="w-full h-full text-blue-400"
          title="Signed In"
        />
      ) : (
        <UserIcon
          className="w-full h-full text-gray-400"
          title="Not Signed In"
        />
      )}
    </div>
  );
}
