import React from "react";
import { Alert } from "react-native";
import { fireEvent, waitFor, renderWithStore } from "@/utils/test-utils";
import { MainScreen } from "./MainScreen";
import { getPendingEntries } from "@/services/db/queries";
import { supabase } from "@/services/supabase/client";
import { SCREENS } from "@/router/types";
import type { TEntry } from "@/services/db/types";

jest.mock("@/services/db/queries", () => ({
  getPendingEntries: jest.fn().mockResolvedValue([]),
}));

const mockEntry: TEntry = {
  id: "entry-1",
  title: "A Great Day",
  body: "Something happened today.",
  createdAt: new Date(2020, 5, 9).getTime(),
  updatedAt: new Date(2020, 5, 9).getTime(),
  deletedAt: null,
  pendingAction: null,
};

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as any;

const renderScreen = (preloadedState = {}) =>
  renderWithStore(
    <MainScreen navigation={mockNavigation} route={{} as any} />,
    preloadedState,
  );

describe("MainScreen", () => {
  test("shows the empty state when there are no entries", () => {
    const { getByText } = renderScreen();
    expect(getByText("Nothing filed yet.")).toBeTruthy();
  });

  test("renders a list of entries when the store has entries", () => {
    const { getByText } = renderScreen({
      entries: { entries: [mockEntry], isLoading: false, error: null },
    });
    expect(getByText("A Great Day")).toBeTruthy();
    expect(getByText("Something happened today.")).toBeTruthy();
  });

  test("shows 'syncing…' while a sync is in progress", () => {
    const { getByText } = renderScreen({
      sync: { isSyncing: true, lastSynced: null, error: null },
    });
    expect(getByText("syncing…")).toBeTruthy();
  });

  test("shows the last-synced time after a successful sync", () => {
    const lastSynced = Date.now() - 5 * 60_000; // 5 minutes ago
    const { getByText } = renderScreen({
      sync: { isSyncing: false, lastSynced, error: null },
    });
    expect(getByText(/synced/)).toBeTruthy();
  });

  test("navigates to AddEdit for a new entry when the + button is pressed", () => {
    const { getByTestId } = renderScreen();
    fireEvent.press(getByTestId("add-button"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.AddEdit);
  });

  test("navigates to AddEdit for an existing entry when a row is tapped", () => {
    const { getByTestId } = renderScreen({
      entries: { entries: [mockEntry], isLoading: false, error: null },
    });
    fireEvent.press(getByTestId("entry-row-pressable"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.AddEdit, {
      entryId: "entry-1",
    });
  });

  test("opens the header menu when the options button is pressed", () => {
    const { getByTestId, getByText } = renderScreen();
    fireEvent.press(getByTestId("options-button"));
    expect(getByText("Info")).toBeTruthy();
    expect(getByText("Log Out")).toBeTruthy();
  });

  test("navigates to Info when Info menu option is pressed", () => {
    const { getByTestId, getByText } = renderScreen();
    fireEvent.press(getByTestId("options-button"));
    fireEvent.press(getByText("Info"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.Info);
  });

  test("signs out directly when there are no pending entries", async () => {
    (getPendingEntries as jest.Mock).mockResolvedValue([]);

    const { getByTestId, getByText } = renderScreen();
    fireEvent.press(getByTestId("options-button"));
    fireEvent.press(getByText("Log Out"));

    await waitFor(() => {
      expect(supabase.auth.signOut).toHaveBeenCalledTimes(1);
    });
  });

  test("shows a confirmation alert when there are unsynced entries before logout", async () => {
    (getPendingEntries as jest.Mock).mockResolvedValue([mockEntry]);
    const alertSpy = jest
      .spyOn(Alert, "alert")
      .mockImplementation(() => undefined);

    const { getByTestId, getByText } = renderScreen();
    fireEvent.press(getByTestId("options-button"));
    fireEvent.press(getByText("Log Out"));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Unsynced entries",
        expect.any(String),
        expect.any(Array),
      );
    });
    expect(supabase.auth.signOut).not.toHaveBeenCalled();
  });
});
