import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";

type ThemeType = "light" | "dark";

const themes = {
  light: {
    background: "#f5f5f5",
    color: "#000",
    cardBg: "#fff",
    text: "#000",
  },
  dark: {
    background: "#333",
    color: "#fff",
    cardBg: "#444",
    text: "#000",
  },
};

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    return (localStorage.getItem("theme") as ThemeType) || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledProvider theme={themes[theme]}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};
