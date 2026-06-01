import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { vs } from "react-native-size-matters";

export const MenuOverlay = styled.Pressable`
  flex: 1;
`;

export const MenuBox = styled.View.attrs(() => ({
  onStartShouldSetResponder: () => true,
}))`
  position: absolute;
  top: ${vs(56)}px;
  right: ${vs(16)}px;
  min-width: ${vs(148)}px;
  background-color: #f4efe6;
  border-radius: ${vs(8)}px;
  border-width: 1px;
  border-color: rgba(140, 133, 126, 0.45);
  padding-top: ${vs(4)}px;
  padding-bottom: ${vs(4)}px;
`;

export const MenuItem = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.55,
}))`
  flex-direction: row;
  align-items: center;
  padding-top: ${vs(11)}px;
  padding-bottom: ${vs(11)}px;
  padding-left: ${vs(14)}px;
  padding-right: ${vs(14)}px;
  gap: ${vs(10)}px;
`;

export const MenuDivider = styled.View`
  height: 1px;
  background-color: #1a1008;
  opacity: 0.15;
  margin-left: ${vs(14)}px;
  margin-right: ${vs(14)}px;
`;

export const MenuItemLabel = styled.Text`
  font-family: LibreBaskerville_400Regular;
  font-size: ${vs(12)}px;
  color: #1a1008;
  letter-spacing: 0.3px;
`;

export const MenuItemLabelDanger = styled.Text`
  font-family: LibreBaskerville_400Regular;
  font-size: ${vs(12)}px;
  color: #8b2020;
  letter-spacing: 0.3px;
`;

// size is fixed; name and color are passed as props by the component
export const MenuIcon = styled(Ionicons).attrs(() => ({
  size: vs(15),
}))`
  line-height: ${vs(15)}px;
`;
