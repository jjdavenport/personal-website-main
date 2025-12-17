"use client";

import { useEffect, useState } from "react";

const useTheme = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  useEffect(() => {
    const root = document.documentElement.classList;
    if (darkMode) {
      root.add("dark");
    } else {
      root.remove("dark");
    }
  });

  return {
    darkMode,
    setDarkMode,
  };
};

export default useTheme;
