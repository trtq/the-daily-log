import { Linking } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { BackButton } from "@/components/BackButton/BackButton";
import { Logo } from "@/components/Logo/Logo";
import {
  Screen,
  ScrollContent,
  LogoWrapper,
  ThickRule,
  ThinRule,
  Section,
  Kicker,
  Headline,
  BodyText,
  ItalicText,
  LinkRow,
  LinkLeft,
  LinkLabel,
  LinkSub,
  LinkDivider,
  GithubIcon,
  LinkedinIcon,
  DeleteAccountButton,
  DeleteAccountText,
} from "./layouts";

export const InfoScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.Info>) => (
  <Screen>
    <BackButton onPress={navigation.goBack} />
    <ScrollContent>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <ThickRule />

      <Section>
        <Kicker>About This App</Kicker>
        <Headline>Write. Reflect.{"\n"}Come Back Tomorrow.</Headline>
        <BodyText>
          The Daily Log is a personal journaling app for capturing thoughts,
          reflections, and the small moments worth holding on to.
        </BodyText>
        <ItalicText>
          {"\n"}Built as a portfolio project to demonstrate real-world React
          Native engineering — from local persistence to cloud sync.
        </ItalicText>
      </Section>

      <ThinRule />

      <Section>
        <Kicker>Under the Hood</Kicker>
        <BodyText>
          React Native and Expo. SQLite for local storage, Supabase for the
          cloud. Redux Toolkit for state. Styled-components for the UI.
        </BodyText>
      </Section>

      <ThickRule />

      <Section>
        <Kicker>The Developer</Kicker>
        <Headline>Eugene Ivanitsky</Headline>
        <BodyText>
          Senior React Native engineer with 7+ years of experience building
          mobile products.
        </BodyText>
      </Section>

      <ThinRule />

      <Section>
        <Kicker>Get in Touch</Kicker>
        <LinkRow
          onPress={() =>
            Linking.openURL("https://github.com/trtq/the-daily-log")
          }
        >
          <LinkLeft>
            <GithubIcon />
            <LinkLabel>GitHub</LinkLabel>
          </LinkLeft>
          <LinkSub>@trtq</LinkSub>
        </LinkRow>
        <LinkDivider />
        <LinkRow
          onPress={() =>
            Linking.openURL("https://www.linkedin.com/in/evgeny-ivanitsky")
          }
        >
          <LinkLeft>
            <LinkedinIcon />
            <LinkLabel>LinkedIn</LinkLabel>
          </LinkLeft>
          <LinkSub>Eugene Ivanitsky</LinkSub>
        </LinkRow>
      </Section>
      <DeleteAccountButton
        onPress={() =>
          Linking.openURL(
            "https://trtq.github.io/the-daily-log/account-deletion.html",
          )
        }
      >
        <DeleteAccountText>Delete account</DeleteAccountText>
      </DeleteAccountButton>
    </ScrollContent>
  </Screen>
);
