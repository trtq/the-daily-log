import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { type ReactElement } from "react";
import Animated, {
  type FlatListPropsWithLayout,
} from "react-native-reanimated";
import styled from "styled-components/native";
import { s } from "react-native-size-matters";
import type { TEntry } from "@/services/db/types";

export const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.bg};
`;

export const Header = styled.View`
  height: ${s(46)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${s(20)}px;
  padding-right: ${s(18)}px;
`;

export const SyncStatus = styled.Text`
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${s(11)}px;
  color: ${(props) => props.theme.ink};
  opacity: 0.4;
`;

export const SyncError = styled.Text`
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${s(11)}px;
  color: ${(props) => props.theme.accentError};
`;

export const HeaderButtons = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${s(11)}px;
`;

export const CircleButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.5,
}))`
  width: ${s(24)}px;
  height: ${s(24)}px;
  border-radius: ${s(12)}px;
  border-width: ${s(2)}px;
  border-color: ${(props) => props.theme.muted};
  justify-content: center;
  align-items: center;
`;

export const AddIcon = styled(Ionicons).attrs((props) => ({
  name: "add",
  size: s(18),
  color: props.theme.muted,
}))`
  line-height: ${s(18)}px;
`;

export const OptionsIcon = styled(Ionicons).attrs((props) => ({
  name: "ellipsis-horizontal",
  size: s(14),
  color: props.theme.muted,
}))`
  line-height: ${s(14)}px;
`;

export const EntryList = styled(
  Animated.FlatList as (props: FlatListPropsWithLayout<TEntry>) => ReactElement,
).attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
}))``;

export const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyStateText = styled.Text`
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${s(14)}px;
  color: ${(props) => props.theme.ink};
  opacity: 0.4;
`;
