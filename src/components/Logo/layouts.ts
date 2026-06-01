import styled from "styled-components/native";
import { s } from "react-native-size-matters";

// aspectRatio is owned here — wrappers control width only
export const LogoOuter = styled.View`
  width: 100%;
  aspect-ratio: 3;
  flex-direction: column;
`;

export const LogoThinRule = styled.View`
  width: 100%;
  height: 1px;
  background-color: #1a1008;
`;

export const LogoThickRule = styled.View`
  width: 100%;
  height: ${s(3)}px;
  background-color: #1a1008;
`;

export const LogoInner = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-left: ${s(6)}px;
  padding-right: ${s(6)}px;
  gap: ${s(3)}px;
`;

export const LogoText = styled.Text.attrs(() => ({
  adjustsFontSizeToFit: true,
  numberOfLines: 1,
}))`
  font-family: AbrilFatface_400Regular;
  color: #1a1008;
  font-size: 200px;
  text-align: center;
  width: 100%;
  letter-spacing: ${s(2)}px;
`;

export const LogoSubtitle = styled.Text.attrs(() => ({
  adjustsFontSizeToFit: true,
  numberOfLines: 1,
}))`
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${s(9)}px;
  color: #1a1008;
  letter-spacing: ${s(1.5)}px;
  text-align: center;
  width: 100%;
`;
