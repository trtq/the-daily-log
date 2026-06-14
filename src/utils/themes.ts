export enum THEME_NAMES {
  light = "light",
  dark = "dark",
}

export const themes = {
  [THEME_NAMES.light]: {
    bg: "#f4efe6",
    ink: "#1a1008",
    muted: "rgba(140, 133, 126, 0.9)",
    border: "rgba(140, 133, 126, 0.45)",
    accent: "#8b2020",
    accentFg: "#f4efe6",
    accentError: "#b33a3a",
    placeholder: "#1a100840",
    btnBg: "#1a1008",
    btnBgDisabled: "#c4b5a5",
    btnText: "#f4efe6",
    themeIcon: "moon-outline" as const,
  },
  [THEME_NAMES.dark]: {
    bg: "#1a1008",
    ink: "#f0e8d8",
    muted: "rgba(160, 148, 136, 0.85)",
    border: "rgba(240, 232, 216, 0.2)",
    accent: "#8b2020",
    accentFg: "#f4efe6",
    accentError: "#d96060",
    placeholder: "#f0e8d840",
    btnBg: "#f0e8d8",
    btnBgDisabled: "#4a3a2a",
    btnText: "#1a1008",
    themeIcon: "sunny-outline" as const,
  },
};
