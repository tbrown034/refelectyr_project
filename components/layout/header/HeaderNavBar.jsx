// components/layout/header/HeaderNavBar.jsx
"use client";

import Link from "next/link";
import { useContext } from "react";
import { YearContext } from "@/library/contexts/YearContext";
import { ListContext } from "@/library/contexts/ListContext";
import { ListBulletIcon } from "@heroicons/react/24/solid";

const HeaderNavBar = () => {
  // Replace use() with useContext()
  const { selectedYear } = useContext(YearContext);
  const { movieList, tvList } = useContext(ListContext);
  const hasLists = movieList.length > 0 || tvList.length > 0;
  const totalItems = movieList.length + tvList.length;

  // Static routes that don't need year param
  const staticRoutes = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
  ];

  // Media routes that should include year param
  const mediaRoutes = [
    { text: "Movies", href: `/movies?year=${selectedYear}` },
    { text: "TV Shows", href: `/tv?year=${selectedYear}` },
  ];

  return (
    <nav className="flex gap-4">
      {staticRoutes.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="text-gray-900 dark:text-white hover:underline transition-colors"
        >
          {item.text}
        </Link>
      ))}

      {mediaRoutes.map((item, index) => (
        <Link
          key={`media-${index}`}
          href={item.href}
          className="text-gray-900 dark:text-white hover:underline transition-colors"
        >
          {item.text}
        </Link>
      ))}

      {/* My Lists Link with Count Indicator */}
      <Link
        href="/lists"
        className="text-gray-900 dark:text-white hover:underline transition-colors flex items-center relative"
      >
        <ListBulletIcon className="h-5 w-5 mr-1" />
        My Lists
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default HeaderNavBar;
