import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { s } from "react-native-size-matters";

export const MenuOverlay = styled.Pressable`
  flex: 1;
`;

export const MenuBox = styled.View.attrs(() => ({
  onStartShouldSetResponder: () => true,
}))<{ top: number; right: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  right: ${(props) => props.right}px;
  min-width: ${s(148)}px;
  background-color: ${(props) => props.theme.bg};
  border-radius: ${s(8)}px;
  border-width: 1px;
  border-color: ${(props) => props.theme.border};
  padding-top: ${s(4)}px;
  padding-bottom: ${s(4)}px;
`;

export const MenuItem = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.55,
}))`
  flex-direction: row;
  align-items: center;
  padding-top: ${s(11)}px;
  padding-bottom: ${s(11)}px;
  padding-left: ${s(14)}px;
  padding-right: ${s(14)}px;
  gap: ${s(10)}px;
`;

export const MenuDivider = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.ink};
  opacity: 0.15;
  margin-left: ${s(14)}px;
  margin-right: ${s(14)}px;
`;

export const MenuItemLabel = styled.Text`
  font-family: LibreBaskerville_400Regular;
  font-size: ${s(12)}px;
  color: ${(props) => props.theme.ink};
  letter-spacing: ${s(0.3)}px;
`;

export const MenuItemLabelDanger = styled.Text`
  font-family: LibreBaskerville_400Regular;
  font-size: ${s(12)}px;
  color: ${(props) => props.theme.accent};
  letter-spacing: ${s(0.3)}px;
`;

export const MenuIcon = styled(Ionicons).attrs<{ danger?: boolean }>(
  (props) => ({
    size: s(15),
    color: props.danger ? props.theme.accent : props.theme.ink,
  }),
)`
  line-height: ${s(15)}px;
`;
