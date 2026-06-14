import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { s } from "react-native-size-matters";

export const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.bg};
`;

export const KeyboardContainer = styled(KeyboardAvoidingView).attrs(() => ({
  behavior: Platform.OS === "ios" ? "padding" : "height",
}))`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: ${s(16)}px;
`;

export const DateLine = styled.Text`
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${s(8)}px;
  color: ${(props) => props.theme.ink};
  letter-spacing: ${s(1)}px;
  opacity: 0.55;
`;

export const ThickRule = styled.View`
  height: ${s(3)}px;
  background-color: ${(props) => props.theme.ink};
  margin-left: ${s(18)}px;
  margin-right: ${s(18)}px;
`;

export const TitleInput = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.placeholder,
}))`
  font-family: PlayfairDisplay_900Black;
  font-size: ${s(26)}px;
  color: ${(props) => props.theme.ink};
  line-height: ${s(38)}px;
  padding-top: ${s(14)}px;
  padding-bottom: ${s(10)}px;
  padding-left: ${s(18)}px;
  padding-right: ${s(18)}px;
`;

export const BodyDivider = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.ink};
  opacity: 0.25;
  margin-left: ${s(18)}px;
  margin-right: ${s(18)}px;
`;

export const BodyInput = styled.TextInput.attrs((props) => ({
  multiline: true,
  textAlignVertical: "top",
  placeholderTextColor: props.theme.placeholder,
}))`
  flex: 1;
  font-family: LibreBaskerville_400Regular;
  font-size: ${s(13)}px;
  color: ${(props) => props.theme.ink};
  line-height: ${s(22)}px;
  padding: ${s(12)}px ${s(18)}px;
`;

export const BottomBar = styled.View`
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.ink};
  padding: ${s(10)}px ${s(18)}px;
`;

export const SaveButton = styled.TouchableOpacity.attrs<{ disabled?: boolean }>(
  ({ disabled }) => ({
    activeOpacity: disabled ? 1 : 0.7,
  }),
)<{ disabled?: boolean }>`
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.btnBgDisabled : theme.btnBg};
  padding: ${s(13)}px;
  align-items: center;
`;

export const SaveButtonText = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${s(10)}px;
  color: ${(props) => props.theme.btnText};
  letter-spacing: ${s(2)}px;
  text-transform: uppercase;
`;
