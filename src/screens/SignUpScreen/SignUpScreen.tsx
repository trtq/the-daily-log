import { useState } from "react";
import { Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { supabase } from "@/utils/supabase/client";

export const SignUpScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.SignUp>) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Sign up failed:", error.message);
    }
    // setAuth is handled by onAuthStateChange in DbWrapper
  };

  return (
    <SafeAreaView>
      <Text>Sign Up</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        style={{ borderWidth: 1 }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1 }}
      />
      <Button title="Submit (sign up)" onPress={handleSignUp} />
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};
