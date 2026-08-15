import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "@/store/store";
import { SCREENS, TRootStackParamList } from "./types";
import { LoginScreen } from "@/screens/AuthScreens/LoginScreen";
import { SignUpScreen } from "@/screens/AuthScreens/SignUpScreen";
import { MainScreen } from "@/screens/MainScreen/MainScreen";
import { AddEditScreen } from "@/screens/AddEditScreen/AddEditScreen";
import { InfoScreen } from "@/screens/InfoScreen/InfoScreen";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator<TRootStackParamList>();

const linkingSettings: LinkingOptions<TRootStackParamList> = {
  prefixes: ["thedailylog://"],
  config: {
    initialRouteName: SCREENS.Main,
    screens: {
      [SCREENS.Main]: "main",
      [SCREENS.AddEdit]: "edit/:entryId?",
    },
  },
};

export const RootNavigator = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer linking={linkingSettings}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Group screenOptions={{ animationTypeForReplace: "push" }}>
            <Stack.Screen name={SCREENS.Main} component={MainScreen} />
            <Stack.Screen
              name={SCREENS.AddEdit}
              component={AddEditScreen}
              getId={({ params }) => params?.entryId ?? "new"}
            />
            <Stack.Screen name={SCREENS.Info} component={InfoScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{ animationTypeForReplace: "pop" }}>
            <Stack.Screen name={SCREENS.Login} component={LoginScreen} />
            <Stack.Screen name={SCREENS.SignUp} component={SignUpScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
