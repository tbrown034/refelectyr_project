"use client";

import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeToggle = () => {
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

    // ✅ Listen for system theme changes
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
          !isDarkMode ? "text-yellow-500" : "text-gray-400"
        }`}
      />
      <button
        onClick={toggleTheme}
        className={`relative flex items-center justify-center cursor-pointer w-12 h-6 rounded-full transition-colors duration-300 ${
          isDarkMode ? "bg-gray-600" : "bg-gray-200"
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
          isDarkMode ? "text-blue-500" : "text-gray-400"
        }`}
      />
    </div>
  );
};

export default ThemeToggle;
