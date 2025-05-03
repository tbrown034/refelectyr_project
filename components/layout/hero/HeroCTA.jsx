import { SignInButton } from "@/components/ui/buttons/actions/SignInButton";
import HeroAddButtons from "./HeroButtons/HeroAddButtons";
import { SignOut } from "@/components/ui/buttons/actions/SignOutButton";
import SignInStatus from "@/components/ui/feedback/SignInStatus";

export default function HeroCTA() {
  return (
    <div className="flex flex-col items-center gap-10 mt-10 text-center">
      <section className="flex flex-col gap-3 items-center">
        <h2 className="text-lg font-semibold">Start Your List</h2>
        <HeroAddButtons />
      </section>
      <section className="flex flex-col gap-3 items-center">
        <h2 className="text-lg font-semibold opacity-80">Sign In or Join Up</h2>
        <SignInButton />
        <SignOut />
        <SignInStatus />
      </section>
    </div>
  );
}
