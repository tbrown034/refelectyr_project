import ThemeToggle from "@/Components/UI/ThemeToggle";
import HeaderBranding from "./HeaderBranding";
import HeaderDropDown from "./HeaderDropDown";
import HeaderNavBar from "./HeaderNavBar";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 ">
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
