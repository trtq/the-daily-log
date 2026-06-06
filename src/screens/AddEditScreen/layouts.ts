import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { vs } from "react-native-size-matters";

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
  padding-right: ${vs(16)}px;
`;

export const DateLine = styled.Text`
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${vs(8)}px;
  color: ${(props) => props.theme.ink};
  letter-spacing: ${vs(1)}px;
  opacity: 0.55;
`;

export const ThickRule = styled.View`
  height: ${vs(3)}px;
  background-color: ${(props) => props.theme.ink};
  margin-left: ${vs(18)}px;
  margin-right: ${vs(18)}px;
`;

export const TitleInput = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.placeholder,
}))`
  font-family: PlayfairDisplay_900Black;
  font-size: ${vs(26)}px;
  color: ${(props) => props.theme.ink};
  line-height: ${vs(38)}px;
  padding-top: ${vs(14)}px;
  padding-bottom: ${vs(10)}px;
  padding-left: ${vs(18)}px;
  padding-right: ${vs(18)}px;
`;

export const BodyDivider = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.ink};
  opacity: 0.25;
  margin-left: ${vs(18)}px;
  margin-right: ${vs(18)}px;
`;

export const BodyInput = styled.TextInput.attrs((props) => ({
  multiline: true,
  textAlignVertical: "top",
  placeholderTextColor: props.theme.placeholder,
}))`
  flex: 1;
  font-family: LibreBaskerville_400Regular;
  font-size: ${vs(13)}px;
  color: ${(props) => props.theme.ink};
  line-height: ${vs(22)}px;
  padding: ${vs(12)}px ${vs(18)}px;
`;

export const BottomBar = styled.View`
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.ink};
  padding: ${vs(10)}px ${vs(18)}px;
`;

export const SaveButton = styled.TouchableOpacity.attrs<{ disabled?: boolean }>(
  ({ disabled }) => ({
    activeOpacity: disabled ? 1 : 0.7,
  }),
)<{ disabled?: boolean }>`
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.btnBgDisabled : theme.btnBg};
  padding: ${vs(13)}px;
  align-items: center;
`;

export const SaveButtonText = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${vs(10)}px;
  color: ${(props) => props.theme.btnText};
  letter-spacing: ${vs(2)}px;
  text-transform: uppercase;
`;
