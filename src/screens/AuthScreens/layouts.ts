import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { vs } from "react-native-size-matters";

export const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: #f4efe6;
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
  background-color: #1a1008;
  margin-left: ${vs(18)}px;
  margin-right: ${vs(18)}px;
`;

export const Section = styled.View`
  padding: ${vs(16)}px ${vs(18)}px;
`;

export const Kicker = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${vs(7)}px;
  color: #1a1008;
  letter-spacing: ${vs(2)}px;
  text-transform: uppercase;
  margin-bottom: ${vs(4)}px;
`;

export const Headline = styled.Text`
  font-family: PlayfairDisplay_900Black;
  font-size: ${vs(23)}px;
  color: #1a1008;
  margin-bottom: ${vs(18)}px;
`;

export const InputGroup = styled.View`
  margin-bottom: ${vs(6)}px;
`;

export const InputLabel = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${vs(7)}px;
  color: #1a1008;
  letter-spacing: ${vs(2)}px;
  text-transform: uppercase;
  margin-bottom: ${vs(5)}px;
`;

export const EmailInput = styled.TextInput.attrs(() => ({
  autoCapitalize: "none",
  keyboardType: "email-address",
  autoCorrect: false,
  placeholderTextColor: "#1a100866",
}))<{ hasError?: boolean }>`
  font-family: LibreBaskerville_400Regular;
  font-size: ${vs(13)}px;
  color: #1a1008;
  border-width: 1px;
  border-color: ${({ hasError }) => (hasError ? "#b33a3a" : "#1a1008")};
  padding: ${vs(10)}px ${vs(11)}px;
`;

export const PasswordInput = styled.TextInput.attrs(() => ({
  secureTextEntry: true,
  autoCapitalize: "none",
  autoCorrect: false,
  placeholderTextColor: "#1a100866",
}))<{ hasError?: boolean }>`
  font-family: LibreBaskerville_400Regular;
  font-size: ${vs(13)}px;
  color: #1a1008;
  border-width: 1px;
  border-color: ${({ hasError }) => (hasError ? "#b33a3a" : "#1a1008")};
  padding: ${vs(10)}px ${vs(11)}px;
`;

export const InputError = styled.Text`
  height: ${vs(16)}px;
  padding-top: ${vs(2)}px;
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${vs(9)}px;
  color: #b33a3a;
`;

export const SubmitButton = styled.TouchableOpacity.attrs<{
  disabled?: boolean;
}>(({ disabled }) => ({
  activeOpacity: disabled ? 1 : 0.7,
}))<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#7a6a5a" : "#1a1008")};
  padding: ${vs(13)}px;
  align-items: center;
  margin-bottom: ${vs(14)}px;
`;

export const SubmitButtonText = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${vs(10)}px;
  color: #f4efe6;
  letter-spacing: ${vs(2)}px;
  text-transform: uppercase;
`;

export const AuthError = styled.Text`
  height: ${vs(20)}px;
  padding-top: ${vs(3)}px;
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${vs(10)}px;
  color: #b33a3a;
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
  color: #1a1008;
`;

export const NavLink = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6,
}))``;

export const NavLinkText = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${vs(10)}px;
  color: #1a1008;
  text-decoration-line: underline;
`;
