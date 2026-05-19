import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { AppDispatch } from "@/store/store";
import { clearToken } from "@/store/slices/authSlice";

export const MainScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.Main>) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <SafeAreaView>
      <Text>The Daily Log</Text>
      <Button
        title="Add Entry"
        onPress={() => navigation.navigate(SCREENS.AddEdit, {})}
      />
      <Button
        title="Info"
        onPress={() => navigation.navigate(SCREENS.Info)}
      />
      <Button title="Log Out" onPress={() => dispatch(clearToken())} />
    </SafeAreaView>
  );
};
