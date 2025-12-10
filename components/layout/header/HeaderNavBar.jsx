// components/layout/header/HeaderNavBar.jsx
"use client";

import Link from "next/link";
import { use } from "react";
import { YearContext } from "@/library/contexts/YearContext";
import { ListContext } from "@/library/contexts/ListContext";
import { ListBulletIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const HeaderNavBar = () => {
  const { selectedYear } = use(YearContext);
  const { publishedLists } = use(ListContext);

  // Static routes that don't need year param
  const staticRoutes = [
    { text: "Home", href: "/" },
    { text: "Year-End", href: "/year-end" },
    { text: "About", href: "/about" },
  ];

  // Media routes that should include year param
  // NOTE: TV routes kept in code but hidden from UI for movie-focused MVP
  const mediaRoutes = [
    { text: "Movies", href: `/movies?year=${selectedYear}` },
    // { text: "TV Shows", href: `/tv?year=${selectedYear}` },
  ];

  return (
    <nav className="flex gap-4">
      {staticRoutes.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="text-slate-900 dark:text-slate-100 hover:underline transition-colors"
        >
          {item.text}
        </Link>
      ))}

      {mediaRoutes.map((item, index) => (
        <Link
          key={`media-${index}`}
          href={item.href}
          className="text-slate-900 dark:text-slate-100 hover:underline transition-colors"
        >
          {item.text}
        </Link>
      ))}

      {/* My Lists Link */}
      <Link
        href="/lists"
        className="text-slate-900 dark:text-slate-100 hover:underline transition-colors flex items-center"
      >
        <ListBulletIcon className="h-5 w-5 mr-1" />
        My Lists
      </Link>

      {/* Create List Link */}
      <Link
        href="/create"
        className="text-blue-600 dark:text-blue-400 hover:underline transition-colors flex items-center font-medium"
      >
        <PlusCircleIcon className="h-5 w-5 mr-1" />
        Create
      </Link>
    </nav>
  );
};

export default HeaderNavBar;
