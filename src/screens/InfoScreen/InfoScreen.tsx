import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREENS, TRootStackParamList } from "@/router/types";

export const InfoScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.Info>) => (
  <SafeAreaView>
    <Text>Info</Text>
    <Button title="Back" onPress={() => navigation.goBack()} />
  </SafeAreaView>
);
