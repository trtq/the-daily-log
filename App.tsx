import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { RootNavigator } from "@/router/RootNavigator";
import { DbWrapper } from "@/components/DbWrapper/DbWrapper";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <DbWrapper>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </DbWrapper>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
