// Components/Layout/Header/HeaderDropDown.jsx
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
  ];

  return (
    <div className="relative">
      <Menu>
        <MenuButton
          className="inline-flex items-center gap-2 p-2 rounded-lg border border-slate-300 dark:border-slate-600
          hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600
          transition duration-200 ease-in-out"
        >
          Menu
          <ChevronDownIcon className="w-4 h-4" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 w-56 mt-2 origin-top-right rounded-lg border border-slate-300 dark:border-slate-600
            bg-white dark:bg-slate-800 p-2 text-slate-900 dark:text-slate-100 shadow-lg transition-all ease-in-out duration-150 scale-95 opacity-0
            data-[open]:scale-100 data-[open]:opacity-100 z-50"
        >
          {navItems.map((item, index) => (
            <MenuItem
              key={index}
              as={Link}
              href={item.href}
              className="block w-full px-4 py-2 text-left rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
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
