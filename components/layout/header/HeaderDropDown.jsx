// components/layout/header/HeaderDropDown.jsx
"use client";

import Link from "next/link";
import { use } from "react";
import { YearContext } from "@/library/contexts/YearContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// Import Bars3Icon and remove ChevronDownIcon import
import { Bars3Icon } from "@heroicons/react/24/solid";
import ThemeToggle from "@/components/ui/toggles/DarkModeToggle";

const HeaderDropDown = () => {
  const { selectedYear } = use(YearContext);

  // NOTE: TV routes kept in code but hidden from UI for movie-focused MVP
  const navItems = [
    { text: "Home", href: "/" },
    { text: "Year-End", href: "/year-end", highlight: true },
    { text: "Movies", href: `/movies?year=${selectedYear}` },
    // { text: "TV Shows", href: `/tv?year=${selectedYear}` },
    { text: "My Lists", href: "/lists" },
    { text: "Create List", href: "/create" },
    { text: "About", href: "/about" },
  ];

  return (
    <div className="relative">
      <Menu>
        <MenuButton
          // Simplified styling: remove border, adjust padding, subtle hover/active
          className="flex items-center justify-center p-2 rounded-lg text-slate-700 dark:text-slate-300
          hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          {/* Use Bars3Icon */}
          <Bars3Icon className="w-6 h-6" />
        </MenuButton>

        <MenuItems
          // Keep existing dropdown styles, ensure they match theme
          className="absolute right-0 w-56 mt-2 p-2 bg-white dark:bg-slate-800 border border-slate-200
          dark:border-slate-700 rounded-lg shadow-lg z-10 flex flex-col gap-1 focus:outline-none" // Added focus:outline-none
        >
          {navItems.map((item, index) => (
            <MenuItem
              key={index}
              as={Link}
              href={item.href}
              className={`block w-full p-2 text-left rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 ${
                item.highlight
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-slate-900 dark:text-slate-100"
              }`}
            >
              {item.text}
            </MenuItem>
          ))}
          {/* ThemeToggle container */}
          <div className="p-2 flex items-center justify-center border-t border-slate-200 dark:border-slate-700 mt-1 pt-2">
            <ThemeToggle />
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default HeaderDropDown;
