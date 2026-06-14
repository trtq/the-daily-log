import { useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { AppDispatch, RootState } from "@/store/store";
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
  const dispatch = useDispatch<AppDispatch>();
  const { entryId } = route.params;

  const existing = useSelector((state: RootState) =>
    entryId ? state.entries.entries.find((e) => e.id === entryId) : undefined,
  );

  const [title, setTitle] = useState(existing?.title ?? "");
  const [body, setBody] = useState(existing?.body ?? "");
  const [saving, setSaving] = useState(false);
  const dateRef = useRef(Date.now());

  const handleSave = async () => {
    setSaving(true);
    try {
      if (entryId) {
        await dispatch(editEntry({ id: entryId, title, body })).unwrap();
      } else {
        await dispatch(createEntry({ title, body })).unwrap();
      }
      navigation.goBack();
    } catch {
      setSaving(false);
    }
  };

  return (
    <Screen>
      <KeyboardContainer>
        <Header>
          <BackButton onPress={() => navigation.goBack()} />
          <DateLine>
            {formatLongDate(existing?.createdAt ?? newEntryDate)}
          </DateLine>
        </Header>
        <ThickRule />
        <TitleInput value={title} onChangeText={setTitle} placeholder="Title" />
        <BodyDivider />
        <BodyInput
          value={body}
          onChangeText={setBody}
          placeholder="Write here..."
        />
        <BottomBar>
          <SaveButton
            onPress={handleSave}
            disabled={saving || (!title.trim() && !body.trim())}
          >
            <SaveButtonText>{saving ? "Saving…" : "Save"}</SaveButtonText>
          </SaveButton>
        </BottomBar>
      </KeyboardContainer>
    </Screen>
  );
};
