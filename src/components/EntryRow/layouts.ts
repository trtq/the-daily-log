import { FontAwesome } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { s } from "react-native-size-matters";

export const SWIPE_DELETE_WIDTH = s(80);

export const RowClip = styled.View`
  overflow: hidden;
`;

export const DeleteZone = styled(Animated.View)`
  position: absolute;
  right: ${-SWIPE_DELETE_WIDTH}px;
  top: 0;
  bottom: 0;
  width: ${SWIPE_DELETE_WIDTH}px;
  background-color: ${(props) => props.theme.accent};
  justify-content: center;
  align-items: center;
`;

export const DeleteIcon = styled(FontAwesome).attrs((props) => ({
  name: "trash",
  size: s(22),
  color: props.theme.accentFg,
}))``;

export const RowRule = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.ink};
  opacity: 0.18;
  margin-left: ${s(20)}px;
  margin-right: ${s(20)}px;
`;

export const RowContent = styled.View`
  padding-top: ${s(10)}px;
  padding-bottom: ${s(13)}px;
  padding-left: ${s(20)}px;
  padding-right: ${s(20)}px;
`;

export const RowKicker = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${s(10)}px;
  color: ${(props) => props.theme.ink};
  opacity: 0.45;
  letter-spacing: ${s(1.5)}px;
  text-transform: uppercase;
  margin-bottom: ${s(6)}px;
`;

export const RowTitle = styled.Text`
  font-family: PlayfairDisplay_900Black;
  font-size: ${s(20)}px;
  color: ${(props) => props.theme.ink};
  line-height: ${s(27)}px;
  margin-bottom: ${s(5)}px;
`;

export const RowExcerpt = styled.Text`
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${s(13)}px;
  color: ${(props) => props.theme.ink};
  opacity: 0.55;
  line-height: ${s(20)}px;
`;
