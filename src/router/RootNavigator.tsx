import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { SCREENS, TRootStackParamList } from "./types";
import { LoginScreen } from "@/screens/LoginScreen/LoginScreen";
import { SignUpScreen } from "@/screens/SignUpScreen/SignUpScreen";
import { MainScreen } from "@/screens/MainScreen/MainScreen";
import { AddEditScreen } from "@/screens/AddEditScreen/AddEditScreen";
import { InfoScreen } from "@/screens/InfoScreen/InfoScreen";

const Stack = createNativeStackNavigator<TRootStackParamList>();

export const RootNavigator = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <Stack.Group screenOptions={{ animationTypeForReplace: "push" }}>
          <Stack.Screen name={SCREENS.Main} component={MainScreen} />
          <Stack.Screen name={SCREENS.AddEdit} component={AddEditScreen} />
          <Stack.Screen name={SCREENS.Info} component={InfoScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{ animationTypeForReplace: "pop" }}>
          <Stack.Screen name={SCREENS.Login} component={LoginScreen} />
          <Stack.Screen name={SCREENS.SignUp} component={SignUpScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
