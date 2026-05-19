import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREENS, TRootStackParamList } from "@/router/types";

export const AddEditScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.AddEdit>) => (
  <SafeAreaView>
    <Text>{route.params.entryId ? "Edit Entry" : "New Entry"}</Text>
    <Button title="Save" onPress={() => navigation.goBack()} />
    <Button title="Back" onPress={() => navigation.goBack()} />
  </SafeAreaView>
);
