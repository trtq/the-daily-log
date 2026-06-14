import { createContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { ThemeProvider } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  PlayfairDisplay_900Black,
} from "@expo-google-fonts/playfair-display";
import { AbrilFatface_400Regular } from "@expo-google-fonts/abril-fatface";
import {
  LibreBaskerville_400Regular,
  LibreBaskerville_400Regular_Italic,
  LibreBaskerville_700Bold,
} from "@expo-google-fonts/libre-baskerville";
import { THEME_NAMES, themes } from "@/utils/themes";
import { StatusBar } from "expo-status-bar";

const defaultTheme =
  Appearance.getColorScheme() === "light"
    ? THEME_NAMES.light
    : THEME_NAMES.dark;

export const ThemeContext = createContext<{
  changeTheme: () => void;
  themeLoaded: boolean;
}>({ changeTheme: () => {}, themeLoaded: false });

// context for keeping information about the theme and to load up fonts
export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<THEME_NAMES | null>(null);

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_900Black,
    AbrilFatface_400Regular,
    LibreBaskerville_400Regular,
    LibreBaskerville_400Regular_Italic,
    LibreBaskerville_700Bold,
  });

  useEffect(() => {
    AsyncStorage.getItem("theme")
      .then((savedTheme) => {
        setTheme((savedTheme as THEME_NAMES) || defaultTheme);
      })
      .catch(() => setTheme(defaultTheme));
  }, []);

  const changeTheme = () => {
    setTheme((oldTheme) => {
      const newTheme =
        oldTheme === THEME_NAMES.dark ? THEME_NAMES.light : THEME_NAMES.dark;
      AsyncStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext
      value={{ changeTheme, themeLoaded: !!(fontsLoaded && theme) }}
    >
      <StatusBar style={theme === THEME_NAMES.dark ? "light" : "dark"} />
      <ThemeProvider theme={themes[theme ?? THEME_NAMES.light]}>
        {children}
      </ThemeProvider>
    </ThemeContext>
  );
};
