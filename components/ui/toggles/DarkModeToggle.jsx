"use client";

import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      applyTheme(storedTheme);
    } else {
      // Check system preference if no stored theme
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
      applyTheme(prefersDark ? "dark" : "light");
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        // Only apply system changes if no user choice
        setIsDarkMode(e.matches);
        applyTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-2">
      <SunIcon
        className={`w-6 h-6 transition-colors duration-300 ${
          // Use slate for inactive icon color for consistency
          !isDarkMode ? "text-yellow-500" : "text-slate-400"
        }`}
      />
      <button
        onClick={toggleTheme}
        className={`relative flex items-center justify-center cursor-pointer w-12 h-6 rounded-full transition-colors duration-300 border ${
          // Adjust background and border colors for better contrast in both modes
          isDarkMode
            ? "bg-slate-600 border-slate-500" // Dark mode: Slightly lighter bg, lighter border
            : "bg-slate-300 border-slate-400" // Light mode: Slightly darker bg, darker border
        }`}
      >
        <span
          className={`absolute left-0 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            isDarkMode ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
      <MoonIcon
        className={`w-6 h-6 transition-colors duration-300 ${
          // Use slate for inactive icon color for consistency
          isDarkMode ? "text-blue-500" : "text-slate-400"
        }`}
      />
    </div>
  );
};

export default DarkModeToggle;
