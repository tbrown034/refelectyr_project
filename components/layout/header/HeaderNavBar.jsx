// Components/Layout/Header/HeaderNavBar.jsx
"use client";

import Link from "next/link";
import { useContext } from "react";
import { YearContext } from "@/library/contexts/YearContext";

const HeaderNavBar = () => {
  // Replace use() with useContext()
  const { selectedYear } = useContext(YearContext);

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
    </nav>
  );
};

export default HeaderNavBar;
