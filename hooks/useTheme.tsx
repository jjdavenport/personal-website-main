"use client";

import { useEffect, useState } from "react";

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setDarkMode(prefersDarkMode);
  }, []);

  useEffect(() => {
    const root = document.documentElement.classList;
    if (darkMode) {
      root.add("dark");
    } else {
      root.remove("dark");
    }
  }, [darkMode]);

  return {
    darkMode,
    setDarkMode,
  };
};

export default useTheme;
