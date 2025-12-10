"use client";

import Link from "next/link";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function HeroGetStarted({ year = "2025" }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex items-center justify-center rounded-lg px-6 py-3 bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:cursor-pointer">
        Get Started
        <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        {/* NOTE: TV option kept in code but hidden from UI for movie-focused MVP */}
        <div className="py-1">
          <MenuItem>
            {({ focus }) => (
              <Link
                href={`/movies?year=${year}`}
                className={`${
                  focus ? "bg-gray-100 dark:bg-slate-600" : ""
                } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer`}
              >
                Add Movies
              </Link>
            )}
          </MenuItem>
          {/* <MenuItem>
            {({ focus }) => (
              <Link
                href={`/tv?year=${year}`}
                className={`${
                  focus ? "bg-gray-100 dark:bg-slate-600" : ""
                } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer`}
              >
                Add TV Shows
              </Link>
            )}
          </MenuItem> */}
          <MenuItem>
            {({ focus }) => (
              <Link
                href="/lists"
                className={`${
                  focus ? "bg-gray-100 dark:bg-slate-600" : ""
                } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer`}
              >
                View Lists
              </Link>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
