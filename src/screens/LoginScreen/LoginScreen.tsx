import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { AppDispatch } from "@/store/store";
import { setAuth } from "@/store/slices/authSlice";
import { loadEntries } from "@/store/slices/entriesSlice";

export const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.Login>) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = () => {
    dispatch(setAuth({ token: "placeholder-token", userId: "placeholder-user-id" }));
    dispatch(loadEntries());
  };

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <Button title="Submit (login)" onPress={handleLogin} />
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate(SCREENS.SignUp)}
      />
    </SafeAreaView>
  );
};
