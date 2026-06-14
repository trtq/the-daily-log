import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { vs } from "react-native-size-matters";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.bg};
`;

export const KeyboardContainer = styled(KeyboardAvoidingView).attrs(() => ({
  behavior: Platform.OS === "ios" ? "padding" : "height",
}))`
  flex: 1;
`;

export const CenterWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

export const LogoWrapper = styled.View`
  width: 80%;
  align-self: center;
  margin-bottom: ${vs(16)}px;
`;

export const ThickRule = styled.View`
  height: ${vs(3)}px;
  background-color: ${(props) => props.theme.ink};
  margin-left: ${vs(18)}px;
  margin-right: ${vs(18)}px;
`;

export const Section = styled.View`
  padding: ${vs(16)}px ${vs(18)}px;
`;

export const Kicker = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${vs(7)}px;
  color: ${(props) => props.theme.ink};
  letter-spacing: ${vs(2)}px;
  text-transform: uppercase;
  margin-bottom: ${vs(4)}px;
`;

export const Headline = styled.Text`
  font-family: PlayfairDisplay_900Black;
  font-size: ${vs(23)}px;
  color: ${(props) => props.theme.ink};
  margin-bottom: ${vs(18)}px;
`;

export const InputGroup = styled.View`
  margin-bottom: ${vs(6)}px;
`;

export const InputLabel = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${vs(7)}px;
  color: ${(props) => props.theme.ink};
  letter-spacing: ${vs(2)}px;
  text-transform: uppercase;
  margin-bottom: ${vs(5)}px;
`;

export const EmailInput = styled.TextInput.attrs((props) => ({
  autoCapitalize: "none",
  keyboardType: "email-address",
  autoCorrect: false,
  placeholderTextColor: props.theme.placeholder,
}))<{ hasError?: boolean }>`
  font-family: LibreBaskerville_400Regular;
  font-size: ${vs(13)}px;
  color: ${(props) => props.theme.ink};
  border-width: 1px;
  border-color: ${({ hasError, theme }) =>
    hasError ? theme.accentError : theme.ink};
  padding: ${vs(10)}px ${vs(11)}px;
`;

export const PasswordInput = styled.TextInput.attrs((props) => ({
  secureTextEntry: true,
  autoCapitalize: "none",
  autoCorrect: false,
  placeholderTextColor: props.theme.placeholder,
}))<{ hasError?: boolean }>`
  font-family: LibreBaskerville_400Regular;
  font-size: ${vs(13)}px;
  color: ${(props) => props.theme.ink};
  border-width: 1px;
  border-color: ${({ hasError, theme }) =>
    hasError ? theme.accentError : theme.ink};
  padding: ${vs(10)}px ${vs(11)}px;
`;

export const InputError = styled.Text`
  height: ${vs(16)}px;
  padding-top: ${vs(2)}px;
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${vs(9)}px;
  color: ${(props) => props.theme.accentError};
`;

export const SubmitButton = styled.TouchableOpacity.attrs<{
  disabled?: boolean;
}>(({ disabled }) => ({
  activeOpacity: disabled ? 1 : 0.7,
}))<{ disabled?: boolean }>`
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.btnBgDisabled : theme.btnBg};
  padding: ${vs(13)}px;
  align-items: center;
  margin-bottom: ${vs(14)}px;
`;

export const SubmitButtonText = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${vs(10)}px;
  color: ${(props) => props.theme.btnText};
  letter-spacing: ${vs(2)}px;
  text-transform: uppercase;
`;

export const AuthError = styled.Text`
  height: ${vs(20)}px;
  padding-top: ${vs(3)}px;
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${vs(10)}px;
  color: ${(props) => props.theme.accentError};
`;

export const NavRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${vs(4)}px;
`;

export const NavText = styled.Text`
  font-family: LibreBaskerville_400Regular;
  font-size: ${vs(10)}px;
  color: ${(props) => props.theme.ink};
`;

export const NavLink = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6,
}))``;

export const NavLinkText = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${vs(10)}px;
  color: ${(props) => props.theme.ink};
  text-decoration-line: underline;
`;
