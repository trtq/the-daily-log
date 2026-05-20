import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { AppDispatch } from "@/store/store";
import { setAuth } from "@/store/slices/authSlice";
import { loadEntries } from "@/store/slices/entriesSlice";

export const SignUpScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.SignUp>) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignUp = () => {
    dispatch(setAuth({ token: "placeholder-token", userId: "placeholder-user-id" }));
    dispatch(loadEntries());
  };

  return (
    <SafeAreaView>
      <Text>Sign Up</Text>
      <Button title="Submit (sign up)" onPress={handleSignUp} />
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};
