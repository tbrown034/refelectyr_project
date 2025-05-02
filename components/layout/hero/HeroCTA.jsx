import { SignInButton } from "@/components/ui/buttons/actions/SignInButton";
import HeroAddButtons from "./HeroButtons/HeroAddButtons";
import HeroLogButtons from "./HeroButtons/HeroLogButtons";
import { SignOut } from "@/components/ui/buttons/actions/SignOutButton";
import SignInStatus from "@/components/ui/feedback/SignInStatus";

export default function HeroCTA() {
  return (
    <div className="flex flex-col items-center gap-10 mt-10 text-center">
      {/* Start Your List Section */}
      <section className="flex flex-col gap-3 items-center">
        <h2 className="text-white text-lg font-semibold">Start Your List</h2>
        <HeroAddButtons />
      </section>

      {/* Account Access (Client-Side UI Buttons) */}
      <section className="flex flex-col gap-3 items-center">
        <h2 className="text-white text-lg font-semibold opacity-80">
          Account Access
        </h2>
        <HeroLogButtons />
      </section>

      {/* Real Auth Access (Auth.js Integrated Actions) */}
      <section className="flex flex-col gap-3 items-center">
        <h2 className="text-white text-lg font-semibold opacity-80">
          Real Account Access
        </h2>
        <SignInButton />
        <SignOut />
        <SignInStatus />
      </section>
    </div>
  );
}
