import SignInStatusIcon from "@/components/ui/feedback/SignInStatusIcon";

// Your other imports
import ThemeToggle from "@/components/ui/toggles/DarkModeToggle";
import HeaderBranding from "./HeaderBranding";
import HeaderDropDown from "./HeaderDropDown";
import HeaderNavBar from "./HeaderNavBar";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-2 border-b-2 border-white">
      <HeaderBranding />
      <div className="hidden md:flex">
        <HeaderNavBar />
      </div>
      <div className="flex gap-4 items-center">
        <SignInStatusIcon />
        <ThemeToggle />
        <HeaderDropDown />
      </div>
    </div>
  );
};

export default Header;
