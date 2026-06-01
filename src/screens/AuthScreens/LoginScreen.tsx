import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { supabase } from "@/utils/supabase/client";
import { Logo } from "@/components/Logo/Logo";
import {
  Screen,
  KeyboardContainer,
  CenterWrapper,
  LogoWrapper,
  ThickRule,
  Section,
  Kicker,
  Headline,
  InputGroup,
  InputLabel,
  EmailInput,
  PasswordInput,
  SubmitButton,
  SubmitButtonText,
  AuthError,
  NavRow,
  NavText,
  NavLink,
  NavLinkText,
} from "@/screens/AuthScreens/layouts";

export const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.Login>) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) setAuthError(error.message);
    // success: onAuthStateChange in DbWrapper handles the rest
  };

  return (
    <Screen>
      <KeyboardContainer>
        <CenterWrapper>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <ThickRule />
          <Section>
            <Kicker>Welcome Back</Kicker>
            <Headline>Sign In</Headline>
            <InputGroup>
              <InputLabel>Email</InputLabel>
              <EmailInput value={email} onChangeText={setEmail} />
            </InputGroup>
            <InputGroup>
              <InputLabel>Password</InputLabel>
              <PasswordInput value={password} onChangeText={setPassword} />
            </InputGroup>
            <AuthError>{authError ?? ""}</AuthError>
            <SubmitButton onPress={handleSubmit} disabled={loading}>
              <SubmitButtonText>
                {loading ? "Signing in…" : "Sign In"}
              </SubmitButtonText>
            </SubmitButton>
            <NavRow>
              <NavText>{"Don't have an account?"}</NavText>
              <NavLink onPress={() => navigation.navigate(SCREENS.SignUp)}>
                <NavLinkText>Sign up</NavLinkText>
              </NavLink>
            </NavRow>
          </Section>
        </CenterWrapper>
      </KeyboardContainer>
    </Screen>
  );
};
