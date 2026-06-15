import {
  LogoOuter,
  LogoThickRule,
  LogoInner,
  LogoText,
  LogoSubtitle,
} from "./layouts";

export const Logo = () => (
  <LogoOuter>
    <LogoThickRule />
    <LogoInner>
      <LogoText>THE DAILY LOG</LogoText>
      <LogoSubtitle>
        a daily record of thoughts, ideas, and observations
      </LogoSubtitle>
    </LogoInner>
    <LogoThickRule />
  </LogoOuter>
);
