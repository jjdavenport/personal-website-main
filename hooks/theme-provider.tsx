"use client";

import {
  ReactNode,
  useContext,
  useState,
  useEffect,
  createContext,
  SetStateAction,
} from "react";

type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<SetStateAction<boolean>>;
};

const themeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setDarkMode(prefersDarkMode);
  }, []);

  useEffect(() => {
    const root = document.documentElement.classList;
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (darkMode) {
      root.add("dark");
      metaThemeColor?.setAttribute("content", "#252525");
    } else {
      root.remove("dark");
      metaThemeColor?.setAttribute("content", "#ffffff");
    }
  }, [darkMode]);

  return (
    <themeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </themeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(themeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
