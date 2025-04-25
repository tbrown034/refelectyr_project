// components/layout/header/HeaderDropDown.jsx
"use client";

import Link from "next/link";
import { use } from "react";
import { YearContext } from "@/library/contexts/YearContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const HeaderDropDown = () => {
  const { selectedYear } = use(YearContext);

  const navItems = [
    { text: "Home", href: "/" },
    { text: "Movies", href: `/movies?year=${selectedYear}` },
    { text: "TV Shows", href: `/tv?year=${selectedYear}` },
    { text: "About", href: "/about" },
    { text: "Lists", href: "/lists" },
  ];

  return (
    <div className="relative">
      <Menu>
        <MenuButton
          className="flex items-center gap-2 p-2 rounded-lg border border-slate-300 dark:border-slate-600
          hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600"
        >
          Menu
          <ChevronDownIcon className="w-4 h-4" />
        </MenuButton>

        <MenuItems
          className="absolute right-0 w-56 mt-2 p-2 bg-white dark:bg-slate-800 border border-slate-300
          dark:border-slate-600 rounded-lg shadow-lg z-10"
        >
          {navItems.map((item, index) => (
            <MenuItem
              key={index}
              as={Link}
              href={item.href}
              className="block w-full p-2 text-left rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              {item.text}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default HeaderDropDown;
