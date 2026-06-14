import { use, useState } from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearTransition } from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { ThemeContext } from "@/components/ThemeWrapper/ThemeWrapper";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { deleteEntry } from "@/store/slices/entriesSlice";
import { runSync } from "@/store/slices/syncSlice";
import { supabase } from "@/services/supabase/client";
import { getPendingEntries } from "@/services/db/queries";
import { s } from "react-native-size-matters";
import { formatTimeAgo } from "@/utils/formatTime";
import { EntryRow } from "@/components/EntryRow/EntryRow";
import { HeaderMenu } from "@/components/HeaderMenu/HeaderMenu";
import {
  Screen,
  Header,
  HeaderButtons,
  SyncStatus,
  SyncError,
  CircleButton,
  AddIcon,
  OptionsIcon,
  EntryList,
  EmptyState,
  EmptyStateText,
} from "./layouts";

export const MainScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.Main>) => {
  const dispatch = useAppDispatch();
  const entries = useAppSelector((state) => state.entries.entries);
  const isSyncing = useAppSelector((state) => state.sync.isSyncing);
  const lastSynced = useAppSelector((state) => state.sync.lastSynced);
  const syncError = useAppSelector((state) => state.sync.error);
  const { changeTheme } = use(ThemeContext);
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
        {syncError ? (
          <SyncError>sync failed</SyncError>
        ) : (
          <SyncStatus>
            {isSyncing
              ? "syncing…"
              : lastSynced
                ? `synced ${formatTimeAgo(lastSynced)}`
                : ""}
          </SyncStatus>
        )}
        <HeaderButtons>
          <CircleButton
            testID="options-button"
            onPress={() => setMenuOpen(true)}
          >
            <OptionsIcon />
          </CircleButton>
          <CircleButton
            testID="add-button"
            onPress={() => navigation.navigate(SCREENS.AddEdit)}
          >
            <AddIcon />
          </CircleButton>
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
            onPress: changeTheme,
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
