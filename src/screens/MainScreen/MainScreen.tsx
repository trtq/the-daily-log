import { Button, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { SCREENS, TRootStackParamList } from "@/router/types";
import { AppDispatch, RootState } from "@/store/store";
import { deleteEntry } from "@/store/slices/entriesSlice";
import { runSync } from "@/store/slices/syncSlice";
import { supabase } from "@/utils/supabase/client";
import { formatTimeAgo } from "@/utils/formatTimeAgo";

export const MainScreen = ({
  navigation,
}: NativeStackScreenProps<TRootStackParamList, SCREENS.Main>) => {
  const dispatch = useDispatch<AppDispatch>();
  const entries = useSelector((state: RootState) => state.entries.entries);
  const isSyncing = useSelector((state: RootState) => state.sync.isSyncing);
  const lastSynced = useSelector((state: RootState) => state.sync.lastSynced);
  const syncError = useSelector((state: RootState) => state.sync.error);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // clearAuth + clearEntries are handled by onAuthStateChange SIGNED_OUT in DbWrapper
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>The Daily Log</Text>
      {isSyncing && <Text>Syncing...</Text>}
      {!isSyncing && syncError && <Text>Sync error: {syncError}</Text>}
      {!isSyncing && !syncError && lastSynced && (
        <Text>Last synced {formatTimeAgo(lastSynced)}</Text>
      )}
      <Button
        title="Add Entry"
        onPress={() => navigation.navigate(SCREENS.AddEdit, {})}
      />
      <Button title="Info" onPress={() => navigation.navigate(SCREENS.Info)} />
      <Button title="Log Out" onPress={handleLogout} />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        refreshing={isSyncing}
        onRefresh={() => {
          if (!isSyncing) dispatch(runSync());
        }}
        renderItem={({ item }) => (
          <>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
            <Button
              title="Edit"
              onPress={() =>
                navigation.navigate(SCREENS.AddEdit, { entryId: item.id })
              }
            />
            <Button
              title="Delete"
              onPress={() => dispatch(deleteEntry(item.id))}
            />
          </>
        )}
      />
    </SafeAreaView>
  );
};
