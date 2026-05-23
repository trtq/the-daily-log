import { useState } from "react";
import { Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { supabase } from "@/utils/supabase/client";

export const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.Login>) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Login failed:", error.message);
    }
    // setAuth is handled by onAuthStateChange in DbWrapper
  };

  return (
    <SafeAreaView>
      <Text>Login</Text>
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
      <Button title="Submit (login)" onPress={handleLogin} />
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate(SCREENS.SignUp)}
      />
    </SafeAreaView>
  );
};
