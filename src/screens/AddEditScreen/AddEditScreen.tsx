import { useState } from "react";
import { Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { AppDispatch } from "@/store/store";
import { createEntry } from "@/store/slices/entriesSlice";

export const AddEditScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.AddEdit>) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSave = async () => {
    try {
      await dispatch(createEntry({ title, body })).unwrap();
      navigation.goBack();
    } catch (e: any) {
      console.error("createEntry failed:", e?.message, e?.code, String(e));
    }
  };

  return (
    <SafeAreaView>
      <Text>{route.params.entryId ? "Edit Entry" : "New Entry"}</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={{ borderWidth: 1 }}
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Body"
        multiline
        style={{ borderWidth: 1 }}
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};
