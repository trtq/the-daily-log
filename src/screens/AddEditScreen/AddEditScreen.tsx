import { useState } from "react";
import { Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { AppDispatch, RootState } from "@/store/store";
import { createEntry, editEntry } from "@/store/slices/entriesSlice";

export const AddEditScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.AddEdit>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { entryId } = route.params;

  const existing = useSelector((state: RootState) =>
    entryId ? state.entries.entries.find((e) => e.id === entryId) : undefined,
  );

  const [title, setTitle] = useState(existing?.title ?? "");
  const [body, setBody] = useState(existing?.body ?? "");

  const handleSave = async () => {
    try {
      if (entryId) {
        await dispatch(editEntry({ id: entryId, title, body })).unwrap();
      } else {
        await dispatch(createEntry({ title, body })).unwrap();
      }
      navigation.goBack();
    } catch (e: any) {
      console.error("save failed:", e?.message, e?.code, String(e));
    }
  };

  return (
    <SafeAreaView>
      <Text>{entryId ? "Edit Entry" : "New Entry"}</Text>
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
