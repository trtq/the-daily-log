import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { AppDispatch } from "@/store/store";
import { setToken } from "@/store/slices/authSlice";

export const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.Login>) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <Button title="Submit (login)" onPress={() => dispatch(setToken("placeholder-token"))} />
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate(SCREENS.SignUp)}
      />
    </SafeAreaView>
  );
};
