import React from "react";
import { render, fireEvent } from "@/utils/test-utils";
import { EntryRow } from "./EntryRow";
import type { TEntry } from "@/services/db/types";

const mockEntry: TEntry = {
  id: "abc-123",
  title: "Buy some sludge",
  body: "Really feel like eating some sludge lately",
  createdAt: new Date(2020, 5, 9).getTime(), // Jun 9, 2020
  updatedAt: new Date(2020, 5, 9).getTime(),
  deletedAt: null,
  pendingAction: null,
};

describe("EntryRow", () => {
  test("renders the entry title", () => {
    const { getByText } = render(
      <EntryRow entry={mockEntry} onPress={() => {}} onDelete={() => {}} />,
    );
    expect(getByText("Buy some sludge")).toBeTruthy();
  });

  test("renders 'Untitled' when the title is empty", () => {
    const { getByText } = render(
      <EntryRow
        entry={{ ...mockEntry, title: "" }}
        onPress={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(getByText("Untitled")).toBeTruthy();
  });

  test("renders the formatted creation date", () => {
    const { getByText } = render(
      <EntryRow entry={mockEntry} onPress={() => {}} onDelete={() => {}} />,
    );
    expect(getByText("Jun 9, 2020")).toBeTruthy();
  });

  test("renders the body excerpt when body is present", () => {
    const { getByText } = render(
      <EntryRow entry={mockEntry} onPress={() => {}} onDelete={() => {}} />,
    );
    expect(
      getByText("Really feel like eating some sludge lately"),
    ).toBeTruthy();
  });

  test("does not render an excerpt when body is empty", () => {
    const { queryByTestId } = render(
      <EntryRow
        entry={{ ...mockEntry, body: "" }}
        onPress={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(queryByTestId("row-excerpt")).toBeNull();
  });

  test("calls onPress when the row is tapped", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <EntryRow entry={mockEntry} onPress={onPress} onDelete={() => {}} />,
    );
    fireEvent.press(getByTestId("entry-row-pressable"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
