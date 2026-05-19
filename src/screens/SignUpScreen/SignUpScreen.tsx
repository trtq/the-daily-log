import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { AppDispatch } from "@/store/store";
import { setToken } from "@/store/slices/authSlice";

export const SignUpScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.SignUp>) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <SafeAreaView>
      <Text>Sign Up</Text>
      <Button title="Submit (sign up)" onPress={() => dispatch(setToken("placeholder-token"))} />
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};
