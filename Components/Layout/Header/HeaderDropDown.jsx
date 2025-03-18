// Components/Layout/Header/HeaderDropDown.jsx
"use client";

import Link from "next/link";
import { use } from "react";
import { YearContext } from "library/Contexts/YearContext";
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
          className="inline-flex items-center gap-2 p-2 rounded-lg border-1 dark:hover:bg-slate-700 dark:active:bg-slate-500
          cursor-pointer hover:bg-slate-300 active:bg-slate-500
          transition duration-200 ease-in-out"
        >
          Menu
          <ChevronDownIcon className="w-4 h-4" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 w-56 mt-2 origin-top-right rounded-lg border border-gray-300
            bg-white dark:bg-gray-100 p-2 text-gray-900 shadow-lg transition-all ease-in-out duration-150 scale-95 opacity-0
            data-[open]:scale-100 data-[open]:opacity-100"
        >
          {navItems.map((item, index) => (
            <MenuItem
              key={index}
              as={Link}
              href={item.href}
              className="block w-full px-4 py-2 text-left rounded-md hover:bg-gray-200 transition"
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
