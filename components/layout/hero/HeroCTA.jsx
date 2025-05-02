import SignInButton from "@/components/ui/buttons/actions/SignInButton";
import HeroAddButtons from "./HeroButtons/HeroAddButtons";
import HeroLogButtons from "./HeroButtons/HeroLogButtons";

export default function HeroCTA() {
  return (
    <div className="flex flex-col items-center gap-8 mt-6">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-white text-lg font-semibold">Start Your List</h2>
        <HeroAddButtons />
      </div>
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-white text-lg font-semibold opacity-80">
          Account Access
        </h2>
        <HeroLogButtons />
      </div>
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-white text-lg font-semibold opacity-80">
          Real Account Access
        </h2>
        <SignInButton />
      </div>
    </div>
  );
}
