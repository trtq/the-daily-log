import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    bg: string;
    ink: string;
    muted: string;
    border: string;
    accent: string;
    accentFg: string;
    accentError: string;
    placeholder: string;
    btnBg: string;
    btnBgDisabled: string;
    btnText: string;
    themeIcon: "moon-outline" | "sunny-outline";
  }
}
