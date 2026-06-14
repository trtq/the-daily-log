import React from "react";
import { render, fireEvent } from "@/utils/test-utils";
import { BackButton } from "./BackButton";

describe("BackButton", () => {
  test("renders the BACK label", () => {
    const { getByText } = render(<BackButton onPress={() => {}} />);
    expect(getByText("BACK")).toBeTruthy();
  });

  test("calls onPress when tapped", () => {
    const onPress = jest.fn();
    const { getByText } = render(<BackButton onPress={onPress} />);
    fireEvent.press(getByText("BACK"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
