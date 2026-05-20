import { Button, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { AppDispatch, RootState } from "@/store/store";
import { clearAuth } from "@/store/slices/authSlice";
import { clearEntries } from "@/store/slices/entriesSlice";

export const MainScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.Main>) => {
  const dispatch = useDispatch<AppDispatch>();
  const entries = useSelector((state: RootState) => state.entries.entries);

  const handleLogout = () => {
    dispatch(clearEntries());
    dispatch(clearAuth());
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>The Daily Log</Text>
      <Button
        title="Add Entry"
        onPress={() => navigation.navigate(SCREENS.AddEdit, {})}
      />
      <Button title="Info" onPress={() => navigation.navigate(SCREENS.Info)} />
      <Button title="Log Out" onPress={handleLogout} />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};
