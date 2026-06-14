import React from "react";
import { fireEvent, waitFor, renderWithStore } from "@/utils/test-utils";
import { AddEditScreen } from "./AddEditScreen";
import { insertEntry } from "@/services/db/queries";
import type { TEntry } from "@/services/db/types";

jest.mock("expo-crypto", () => ({
  randomUUID: jest.fn(() => "new-entry-id"),
}));

jest.mock("@/services/db/queries", () => ({
  insertEntry: jest.fn().mockResolvedValue(undefined),
  updateEntry: jest.fn().mockResolvedValue(undefined),
  getEntryById: jest.fn(),
  clearPendingAction: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/services/supabase/entries", () => ({
  upsertRemoteEntry: jest.fn().mockResolvedValue(undefined),
  markRemoteDeleted: jest.fn().mockResolvedValue(undefined),
}));

const mockEntry: TEntry = {
  id: "existing-id",
  title: "Old Title",
  body: "Old body text.",
  createdAt: new Date(2020, 5, 9).getTime(),
  updatedAt: new Date(2020, 5, 9).getTime(),
  deletedAt: null,
  pendingAction: null,
};

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as any;

const renderScreen = (params: { entryId?: string } = {}, preloadedState = {}) =>
  renderWithStore(
    <AddEditScreen navigation={mockNavigation} route={{ params } as any} />,
    preloadedState,
  );

describe("AddEditScreen", () => {
  test("renders an empty form for a new entry", () => {
    const { getByPlaceholderText } = renderScreen();
    expect(getByPlaceholderText("Title").props.value).toBe("");
    expect(getByPlaceholderText("Write here...").props.value).toBe("");
  });

  test("pre-fills the form when editing an existing entry", () => {
    const { getByDisplayValue } = renderScreen(
      { entryId: "existing-id" },
      {
        entries: { entries: [mockEntry], isLoading: false, error: null },
      },
    );
    expect(getByDisplayValue("Old Title")).toBeTruthy();
    expect(getByDisplayValue("Old body text.")).toBeTruthy();
  });

  test("save button is disabled when both title and body are empty", async () => {
    const { getByTestId } = renderScreen();
    fireEvent.press(getByTestId("save-button"));
    await waitFor(() => {
      expect(insertEntry).not.toHaveBeenCalled();
    });
    expect(mockNavigation.goBack).not.toHaveBeenCalled();
  });

  test("save button is enabled when a title is provided", async () => {
    const { getByTestId } = renderScreen();
    fireEvent.changeText(getByTestId("title-input"), "New Entry Title");
    fireEvent.press(getByTestId("save-button"));

    await waitFor(() => {
      expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
    });
  });

  test("save button is enabled when only the body is provided", async () => {
    const { getByTestId } = renderScreen();
    fireEvent.changeText(getByTestId("body-input"), "Just a body, no title.");
    fireEvent.press(getByTestId("save-button"));

    await waitFor(() => {
      expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
    });
  });

  test("creates a new entry and navigates back on save", async () => {
    const { getByTestId, testStore } = renderScreen();

    fireEvent.changeText(getByTestId("title-input"), "Brand New Entry");
    fireEvent.changeText(getByTestId("body-input"), "Body content.");
    fireEvent.press(getByTestId("save-button"));

    await waitFor(() => {
      expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
    });

    expect(testStore.getState().entries.entries).toHaveLength(1);
    expect(testStore.getState().entries.entries[0].title).toBe(
      "Brand New Entry",
    );
  });

  test("edits an existing entry and navigates back on save", async () => {
    const { getByTestId, testStore } = renderScreen(
      { entryId: "existing-id" },
      {
        entries: { entries: [mockEntry], isLoading: false, error: null },
      },
    );

    fireEvent.changeText(getByTestId("title-input"), "Updated Title");
    fireEvent.press(getByTestId("save-button"));

    await waitFor(() => {
      expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
    });

    expect(testStore.getState().entries.entries[0].title).toBe("Updated Title");
  });

  test("shows 'Saving…' while the save is in flight", () => {
    // Make insertEntry never resolve so we catch the loading state
    (insertEntry as jest.Mock).mockReturnValue(new Promise(() => {}));

    const { getByTestId, getByText } = renderScreen();
    fireEvent.changeText(getByTestId("title-input"), "My Entry");
    fireEvent.press(getByTestId("save-button"));

    expect(getByText("Saving…")).toBeTruthy();
  });

  test("renders the Back button and navigates back when pressed", () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText("BACK"));
    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
  });
});
