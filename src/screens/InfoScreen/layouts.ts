import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";

export const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.bg};
`;

export const ScrollContent = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { paddingBottom: s(35) },
  showsVerticalScrollIndicator: false,
}))``;

export const LogoWrapper = styled.View`
  width: 80%;
  align-self: center;
  margin-top: ${s(13)}px;
  margin-bottom: ${s(22)}px;
`;

export const ThickRule = styled.View`
  height: ${s(3)}px;
  background-color: ${(props) => props.theme.ink};
  margin-left: ${s(20)}px;
  margin-right: ${s(20)}px;
`;

export const ThinRule = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.ink};
  opacity: 0.35;
  margin-left: ${s(20)}px;
  margin-right: ${s(20)}px;
`;

export const Section = styled.View`
  padding: ${s(20)}px ${s(20)}px;
`;

export const Kicker = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${s(9)}px;
  color: ${(props) => props.theme.ink};
  letter-spacing: ${s(2)}px;
  text-transform: uppercase;
  margin-bottom: ${s(7)}px;
`;

export const Headline = styled.Text`
  font-family: PlayfairDisplay_900Black;
  font-size: ${s(24)}px;
  color: ${(props) => props.theme.ink};
  line-height: ${s(33)}px;
  margin-bottom: ${s(11)}px;
`;

export const BodyText = styled.Text`
  font-family: LibreBaskerville_400Regular;
  font-size: ${s(13)}px;
  color: ${(props) => props.theme.ink};
  line-height: ${s(22)}px;
`;

export const ItalicText = styled.Text`
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${s(13)}px;
  color: ${(props) => props.theme.ink};
  line-height: ${s(22)}px;
`;

export const LinkRow = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6,
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${s(13)}px;
  padding-bottom: ${s(13)}px;
`;

export const LinkLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${s(11)}px;
`;

export const LinkLabel = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${s(13)}px;
  color: ${(props) => props.theme.ink};
  letter-spacing: ${s(1)}px;
`;

export const LinkSub = styled.Text`
  font-family: LibreBaskerville_400Regular;
  font-size: ${s(11)}px;
  color: ${(props) => props.theme.ink};
  opacity: 0.55;
`;

export const LinkDivider = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.ink};
  opacity: 0.2;
`;

export const GithubIcon = styled(FontAwesome).attrs((props) => ({
  name: "github",
  size: s(20),
  color: props.theme.ink,
}))``;

export const LinkedinIcon = styled(FontAwesome).attrs((props) => ({
  name: "linkedin-square",
  size: s(20),
  color: props.theme.ink,
}))``;

export const DeleteAccountButton = styled.TouchableHighlight.attrs((props) => ({
  underlayColor: props.theme.accentError,
}))`
  margin: ${s(20)}px;
  padding: ${s(14)}px;
  align-items: center;
  border-width: 1px;
  border-color: ${(props) => props.theme.accentError};
`;

export const DeleteAccountText = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${s(11)}px;
  color: ${(props) => props.theme.ink};
  letter-spacing: ${s(2)}px;
  text-transform: uppercase;
`;
