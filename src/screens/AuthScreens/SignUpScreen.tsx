import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { supabase } from "@/services/supabase/client";
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
  const [email, setEmail] = useState<TField>(field());
  const [password, setPassword] = useState<TField>(field());
  const [confirm, setConfirm] = useState<TField>(field());
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailError = email.touched ? validateEmail(email.value) : null;
  const passwordError = password.touched
    ? validatePassword(password.value)
    : null;
  // re-derives on every render so it clears immediately if passwords start matching
  const confirmError = confirm.touched
    ? validateConfirm(confirm.value, password.value)
    : null;

  const handleSubmit = async () => {
    setEmail((e) => ({ ...e, touched: true }));
    setPassword((p) => ({ ...p, touched: true }));
    setConfirm((c) => ({ ...c, touched: true }));
    if (
      validateEmail(email.value) ||
      validatePassword(password.value) ||
      validateConfirm(confirm.value, password.value)
    )
      return;

    setLoading(true);
    setAuthError(null);
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
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
            <Kicker>New Here?</Kicker>
            <Headline>Create Account</Headline>
            <InputGroup>
              <InputLabel>Email</InputLabel>
              <EmailInput
                value={email.value}
                onChangeText={(v) => setEmail((e) => ({ ...e, value: v }))}
                onBlur={() => setEmail((e) => ({ ...e, touched: true }))}
                hasError={!!emailError}
              />
              <InputError>{emailError ?? ""}</InputError>
            </InputGroup>
            <InputGroup>
              <InputLabel>Password</InputLabel>
              <PasswordInput
                value={password.value}
                onChangeText={(v) => setPassword((p) => ({ ...p, value: v }))}
                onBlur={() => setPassword((p) => ({ ...p, touched: true }))}
                hasError={!!passwordError}
              />
              <InputError>{passwordError ?? ""}</InputError>
            </InputGroup>
            <InputGroup>
              <InputLabel>Confirm Password</InputLabel>
              <PasswordInput
                value={confirm.value}
                onChangeText={(v) => setConfirm((c) => ({ ...c, value: v }))}
                onBlur={() => setConfirm((c) => ({ ...c, touched: true }))}
                hasError={!!confirmError}
              />
              <InputError>{confirmError ?? ""}</InputError>
            </InputGroup>
            <AuthError>{authError ?? ""}</AuthError>
            <SubmitButton onPress={handleSubmit} disabled={loading}>
              <SubmitButtonText>
                {loading ? "Creating account…" : "Create Account"}
              </SubmitButtonText>
            </SubmitButton>
            <NavRow>
              <NavText>Already have an account?</NavText>
              <NavLink onPress={() => navigation.goBack()}>
                <NavLinkText>Sign in</NavLinkText>
              </NavLink>
            </NavRow>
          </Section>
        </CenterWrapper>
      </KeyboardContainer>
    </Screen>
  );
};
