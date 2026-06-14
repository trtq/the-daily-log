import { use, useState } from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { LinearTransition } from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { ThemeContext } from "@/components/ThemeWrapper/ThemeWrapper";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { AppDispatch, RootState } from "@/store/store";
import { deleteEntry } from "@/store/slices/entriesSlice";
import { runSync } from "@/store/slices/syncSlice";
import { supabase } from "@/utils/supabase/client";
import { getPendingEntries } from "@/utils/db/queries";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import { EntryRow } from "@/components/EntryRow/EntryRow";
import { HeaderMenu } from "@/components/HeaderMenu/HeaderMenu";
import {
  Screen,
  Header,
  HeaderButtons,
  SyncStatus,
  AddButton,
  AddIcon,
  OptionsButton,
  OptionsIcon,
  EntryList,
  EmptyState,
  EmptyStateText,
} from "./layouts";

export const MainScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.Main>) => {
  const dispatch = useDispatch<AppDispatch>();
  const entries = useSelector((state: RootState) => state.entries.entries);
  const isSyncing = useSelector((state: RootState) => state.sync.isSyncing);
  const lastSynced = useSelector((state: RootState) => state.sync.lastSynced);
  const toggleTheme = use(ThemeContext);
  const { themeIcon } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const pending = await getPendingEntries();
    if (pending.length > 0) {
      Alert.alert(
        "Unsynced entries",
        "You have entries that haven't synced to the cloud yet. Log out anyway?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Log Out",
            style: "destructive",
            onPress: () => supabase.auth.signOut(),
          },
        ],
      );
    } else {
      supabase.auth.signOut();
    }
  };

  return (
    <Screen>
      <Header>
        <SyncStatus>
          {isSyncing
            ? "syncing…"
            : lastSynced
              ? `synced ${formatTimeAgo(lastSynced)}`
              : ""}
        </SyncStatus>
        <HeaderButtons>
          <OptionsButton onPress={() => setMenuOpen(true)}>
            <OptionsIcon />
          </OptionsButton>
          <AddButton onPress={() => navigation.navigate(SCREENS.AddEdit, {})}>
            <AddIcon />
          </AddButton>
        </HeaderButtons>
      </Header>

      <EntryList
        data={entries}
        keyExtractor={(item) => item.id}
        itemLayoutAnimation={LinearTransition}
        ListEmptyComponent={
          <EmptyState>
            <EmptyStateText>Nothing filed yet.</EmptyStateText>
          </EmptyState>
        }
        refreshing={isSyncing}
        onRefresh={() => {
          if (!isSyncing) dispatch(runSync());
        }}
        renderItem={({ item }) => (
          <EntryRow
            entry={item}
            onPress={() =>
              navigation.navigate(SCREENS.AddEdit, { entryId: item.id })
            }
            onDelete={() => dispatch(deleteEntry(item.id))}
          />
        )}
      />

      <HeaderMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        top={s(56)}
        right={s(16)}
        options={[
          {
            iconName: "information-circle-outline",
            label: "Info",
            onPress: () => navigation.navigate(SCREENS.Info),
          },
          {
            iconName: themeIcon,
            label: themeIcon === "moon-outline" ? "Dark Mode" : "Light Mode",
            onPress: toggleTheme,
          },
          {
            iconName: "log-out-outline",
            label: "Log Out",
            onPress: handleLogout,
            danger: true,
          },
        ]}
      />
    </Screen>
  );
};
