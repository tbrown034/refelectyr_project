import { auth } from "@/library/auth";
import { headers } from "next/headers";

export default async function SignInStatus() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <p className="text-sm italic ">
      {session?.user?.email
        ? `Signed in as ${session.user.email}`
        : "Not signed in"}
    </p>
  );
}
