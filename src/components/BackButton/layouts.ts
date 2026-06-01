import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { s } from "react-native-size-matters";

export const BackButtonContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6,
}))`
  flex-direction: row;
  align-items: center;
  gap: ${s(4)}px;
  padding: ${s(8)}px ${s(14)}px;
`;

export const BackButtonIcon = styled(Ionicons).attrs(() => ({
  name: "chevron-back",
  size: s(14),
  color: "#1a1008",
}))``;

export const BackButtonLabel = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${s(10)}px;
  color: #1a1008;
  letter-spacing: ${s(1.5)}px;
`;
