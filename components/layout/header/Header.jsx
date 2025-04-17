// components/layout/header/Header.jsx
import ThemeToggle from "@/components/ui/toggles/DarkModeToggle";
import HeaderBranding from "./HeaderBranding";
import HeaderDropDown from "./HeaderDropDown";
import HeaderNavBar from "./HeaderNavBar";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-200 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-700">
      <HeaderBranding />
      <div className="hidden md:flex">
        <HeaderNavBar />
      </div>
      <div className="flex gap-4">
        <ThemeToggle />
        <HeaderDropDown />
      </div>
    </div>
  );
};

export default Header;
