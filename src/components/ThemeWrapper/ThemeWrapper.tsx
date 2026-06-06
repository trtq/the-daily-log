import { createContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { ThemeProvider } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEME_NAMES, themes } from "@/utils/themes/themes";

export const ThemeContext = createContext<() => void>(() => {});

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<THEME_NAMES>(
    Appearance.getColorScheme() === "dark" ? THEME_NAMES.dark : THEME_NAMES.light,
  );

  useEffect(() => {
    AsyncStorage.getItem("theme").then((saved) => {
      if (saved === THEME_NAMES.light || saved === THEME_NAMES.dark) {
        setTheme(saved);
      }
    });
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const next =
        current === THEME_NAMES.light ? THEME_NAMES.dark : THEME_NAMES.light;
      AsyncStorage.setItem("theme", next);
      return next;
    });
  };

  return (
    <ThemeContext value={toggleTheme}>
      <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
    </ThemeContext>
  );
};
