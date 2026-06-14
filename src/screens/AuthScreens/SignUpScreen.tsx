import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { supabase } from "@/services/supabase/client";
import { Logo } from "@/components/Logo/Logo";
import {
  Container,
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
  InputError,
  SubmitButton,
  SubmitButtonText,
  AuthError,
  NavRow,
  NavText,
  NavLink,
  NavLinkText,
} from "@/screens/AuthScreens/layouts";
import {
  getEmailError,
  getPasswordError,
  getConfirmError,
} from "@/utils/validation";

export const SignUpScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.SignUp>) => {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [confirm, setConfirm] = useState("");
  const [confirmTouched, setConfirmTouched] = useState(false);

  const [authError, setAuthError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const emailError = emailTouched && getEmailError(email);
  const passwordError = passwordTouched && getPasswordError(password);
  const confirmError = confirmTouched && getConfirmError(confirm, password);

  const handleSubmit = async () => {
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmTouched(true);
    if (
      !getEmailError(email) &&
      !getPasswordError(password) &&
      !getConfirmError(confirm, password)
    ) {
      setLoading(true);
      setAuthError(null);
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) setAuthError(error.message);
      // success: onAuthStateChange in DbWrapper handles the rest
    }
  };

  return (
    <Container>
      <KeyboardContainer>
        <CenterWrapper>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <ThickRule />
          <Section>
            <Kicker>New Here?</Kicker>
            <Headline>Create Account</Headline>
            <InputGroup>
              <InputLabel>Email</InputLabel>
              <EmailInput
                testID="email-input"
                value={email}
                onChangeText={setEmail}
                onBlur={() => setEmailTouched(true)}
                hasError={!!emailError}
              />
              <InputError>{emailError || ""}</InputError>
            </InputGroup>
            <InputGroup>
              <InputLabel>Password</InputLabel>
              <PasswordInput
                testID="password-input"
                value={password}
                onChangeText={setPassword}
                onBlur={() => setPasswordTouched(true)}
                hasError={!!passwordError}
              />
              <InputError>{passwordError || ""}</InputError>
            </InputGroup>
            <InputGroup>
              <InputLabel>Confirm Password</InputLabel>
              <PasswordInput
                testID="confirm-input"
                value={confirm}
                onChangeText={setConfirm}
                onBlur={() => setConfirmTouched(true)}
                hasError={!!confirmError}
              />
              <InputError>{confirmError || ""}</InputError>
            </InputGroup>
            <AuthError>{authError ?? ""}</AuthError>
            <SubmitButton
              testID="submit-button"
              onPress={handleSubmit}
              disabled={loading}
            >
              <SubmitButtonText>
                {loading ? "Creating account…" : "Create Account"}
              </SubmitButtonText>
            </SubmitButton>
            <NavRow>
              <NavText>Already have an account?</NavText>
              <NavLink onPress={navigation.goBack}>
                <NavLinkText>Sign in</NavLinkText>
              </NavLink>
            </NavRow>
          </Section>
        </CenterWrapper>
      </KeyboardContainer>
    </Container>
  );
};
