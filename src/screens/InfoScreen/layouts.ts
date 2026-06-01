import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";

export const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: #f4efe6;
`;

export const ScrollContent = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { paddingBottom: vs(32) },
  showsVerticalScrollIndicator: false,
}))``;

export const LogoWrapper = styled.View`
  width: 80%;
  align-self: center;
  margin-top: ${vs(12)}px;
  margin-bottom: ${vs(20)}px;
`;

export const ThickRule = styled.View`
  height: ${vs(3)}px;
  background-color: #1a1008;
  margin-left: ${vs(20)}px;
  margin-right: ${vs(20)}px;
`;

export const ThinRule = styled.View`
  height: 1px;
  background-color: #1a1008;
  opacity: 0.35;
  margin-left: ${vs(20)}px;
  margin-right: ${vs(20)}px;
`;

export const Section = styled.View`
  padding: ${vs(18)}px ${vs(20)}px;
`;

export const Kicker = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${vs(8)}px;
  color: #1a1008;
  letter-spacing: ${vs(2)}px;
  text-transform: uppercase;
  margin-bottom: ${vs(6)}px;
`;

export const Headline = styled.Text`
  font-family: PlayfairDisplay_900Black;
  font-size: ${vs(22)}px;
  color: #1a1008;
  line-height: ${vs(30)}px;
  margin-bottom: ${vs(10)}px;
`;

export const BodyText = styled.Text`
  font-family: LibreBaskerville_400Regular;
  font-size: ${vs(12)}px;
  color: #1a1008;
  line-height: ${vs(20)}px;
`;

export const ItalicText = styled.Text`
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${vs(12)}px;
  color: #1a1008;
  line-height: ${vs(20)}px;
`;

export const LinkRow = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6,
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${vs(12)}px;
  padding-bottom: ${vs(12)}px;
`;

export const LinkLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${vs(10)}px;
`;

export const LinkLabel = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${vs(12)}px;
  color: #1a1008;
  letter-spacing: ${vs(1)}px;
`;

export const LinkSub = styled.Text`
  font-family: LibreBaskerville_400Regular;
  font-size: ${vs(10)}px;
  color: #1a1008;
  opacity: 0.55;
`;

export const LinkDivider = styled.View`
  height: 1px;
  background-color: #1a1008;
  opacity: 0.2;
`;

export const GithubIcon = styled(FontAwesome).attrs(() => ({
  name: "github",
  size: vs(18),
  color: "#1a1008",
}))``;

export const LinkedinIcon = styled(FontAwesome).attrs(() => ({
  name: "linkedin-square",
  size: vs(18),
  color: "#1a1008",
}))``;
