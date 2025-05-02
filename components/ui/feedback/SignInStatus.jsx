import { auth } from "@/auth";

export default async function SignInStatus() {
  const session = await auth();

  return (
    <p className="text-sm italic text-white">
      {session?.user?.email
        ? `Signed in as ${session.user.email}`
        : "Not signed in"}
    </p>
  );
}
