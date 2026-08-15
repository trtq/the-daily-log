import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { RootNavigator } from "@/router/RootNavigator";
import { DbWrapper } from "@/components/DbWrapper/DbWrapper";
import { ThemeWrapper } from "@/components/ThemeWrapper/ThemeWrapper";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <ThemeWrapper>
            <DbWrapper>
              <RootNavigator />
            </DbWrapper>
          </ThemeWrapper>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
