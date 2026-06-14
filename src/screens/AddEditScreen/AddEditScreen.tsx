import { useState } from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { createEntry, editEntry } from "@/store/slices/entriesSlice";
import { formatLongDate } from "@/utils/formatTime";
import { BackButton } from "@/components/BackButton/BackButton";
import {
  Screen,
  KeyboardContainer,
  Header,
  DateLine,
  ThickRule,
  TitleInput,
  BodyDivider,
  BodyInput,
  BottomBar,
  SaveButton,
  SaveButtonText,
} from "./layouts";

export const AddEditScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.AddEdit>) => {
  const dispatch = useAppDispatch();
  const entryId = route.params?.entryId;

  const existing = useAppSelector((state) =>
    state.entries.entries.find((e) => e.id === entryId),
  );

  const [title, setTitle] = useState(existing?.title ?? "");
  const [body, setBody] = useState(existing?.body ?? "");
  const [saving, setSaving] = useState(false);
  const [newEntryDate] = useState(() => Date.now());

  const handleSave = async () => {
    setSaving(true);
    try {
      if (entryId && existing) {
        await dispatch(
          editEntry({
            id: entryId,
            title,
            body,
            createdAt: existing.createdAt,
            deletedAt: existing.deletedAt,
          }),
        ).unwrap(); // we use unwrap so that try/catch would fail and the user could try again
      } else if (!entryId) {
        await dispatch(createEntry({ title, body })).unwrap();
      }
      navigation.goBack();
    } catch {
      setSaving(false);
      Alert.alert("Save failed", "Something went wrong. Please try again.");
    }
  };

  return (
    <Screen>
      <KeyboardContainer>
        <Header>
          <BackButton onPress={navigation.goBack} />
          <DateLine>
            {formatLongDate(existing?.createdAt ?? newEntryDate)}
          </DateLine>
        </Header>
        <ThickRule />
        <TitleInput
          testID="title-input"
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
        />
        <BodyDivider />
        <BodyInput
          testID="body-input"
          value={body}
          onChangeText={setBody}
          placeholder="Write here..."
        />
        <BottomBar>
          <SaveButton
            testID="save-button"
            onPress={handleSave}
            disabled={saving || (!title && !body)}
          >
            <SaveButtonText>{saving ? "Saving…" : "Save"}</SaveButtonText>
          </SaveButton>
        </BottomBar>
      </KeyboardContainer>
    </Screen>
  );
};
