import HeroAddButtons from "./HeroButtons/HeroAddButtons";
import HeroLogButtons from "./HeroButtons/HeroLogButtons";
import SignIn from "@/components/ui/auth/signIn";

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
        <div className="rounded-xl p-2 px-4 hover:bg-blue-700 active:scale-95 transition-all bg-blue-600 text-white font-medium cursor-pointer border-4 border-blue-600">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
