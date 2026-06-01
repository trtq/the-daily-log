import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { vs } from "react-native-size-matters";

export const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: #f4efe6;
`;

export const Header = styled.View`
  height: ${vs(42)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${vs(16)}px;
  padding-right: ${vs(16)}px;
`;

export const SyncStatus = styled.Text`
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${vs(10)}px;
  color: #1a1008;
  opacity: 0.4;
`;

export const HeaderButtons = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${vs(10)}px;
`;

const CircleButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.5,
}))`
  width: ${vs(22)}px;
  height: ${vs(22)}px;
  border-radius: ${vs(11)}px;
  border-width: ${vs(2)}px;
  border-color: rgba(140, 133, 126, 0.9);
  justify-content: center;
  align-items: center;
`;

export const AddButton = CircleButton;
export const OptionsButton = CircleButton;

export const AddIcon = styled(Ionicons).attrs(() => ({
  name: "add",
  size: vs(16),
  color: "rgba(140, 133, 126, 0.9)",
}))`
  line-height: ${vs(16)}px;
`;

export const OptionsIcon = styled(Ionicons).attrs(() => ({
  name: "ellipsis-horizontal",
  size: vs(13),
  color: "rgba(140, 133, 126, 0.9)",
}))`
  line-height: ${vs(13)}px;
`;

export const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyStateText = styled.Text`
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${vs(13)}px;
  color: #1a1008;
  opacity: 0.4;
`;
