"use client";

import {
  ReactNode,
  useContext,
  useState,
  useEffect,
  createContext,
} from "react";

const themeContext = createContext(false);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const toggleTheme = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      setDarkMode(!darkMode);
    }, 300);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <themeContext.Provider
      value={{ darkMode, setDarkMode: toggleTheme, isTransitioning }}
    >
      {children}
    </themeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(themeContext);
};
