import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { s } from "react-native-size-matters";

export const BackButtonContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6,
}))`
  flex-direction: row;
  align-items: center;
  gap: ${s(5)}px;
  padding: ${s(9)}px ${s(14)}px;
`;

export const BackButtonIcon = styled(Ionicons).attrs((props) => ({
  name: "chevron-back",
  size: s(15),
  color: props.theme.ink,
}))``;

export const BackButtonLabel = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${s(11)}px;
  color: ${(props) => props.theme.ink};
  letter-spacing: ${s(1.5)}px;
`;
