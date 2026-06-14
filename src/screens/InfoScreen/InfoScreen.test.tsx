import React from "react";
import { Linking } from "react-native";
import { render, fireEvent } from "@/utils/test-utils";
import { InfoScreen } from "./InfoScreen";

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as any;

const renderScreen = () =>
  render(<InfoScreen navigation={mockNavigation} route={{} as any} />);

describe("InfoScreen", () => {
  test("renders the about section", () => {
    const { getByText } = renderScreen();
    expect(getByText("About This App")).toBeTruthy();
    expect(getByText("Write. Reflect.\nCome Back Tomorrow.")).toBeTruthy();
  });

  test("renders the developer section with my name", () => {
    const { getByText, getAllByText } = renderScreen();
    expect(getByText("The Developer")).toBeTruthy();
    // Name appears in the headline and in the LinkedIn sub-label
    expect(getAllByText("Eugene Ivanitsky").length).toBeGreaterThanOrEqual(1);
  });

  test("renders the GitHub and LinkedIn contact links", () => {
    const { getByText } = renderScreen();
    expect(getByText("GitHub")).toBeTruthy();
    expect(getByText("LinkedIn")).toBeTruthy();
  });

  test("opens the GitHub URL when the GitHub row is pressed", () => {
    const openURLSpy = jest
      .spyOn(Linking, "openURL")
      .mockResolvedValue(undefined);

    const { getByText } = renderScreen();
    fireEvent.press(getByText("GitHub"));

    expect(openURLSpy).toHaveBeenCalledWith(
      "https://github.com/trtq/the-daily-log",
    );
  });

  test("opens the LinkedIn URL when the LinkedIn row is pressed", () => {
    const openURLSpy = jest
      .spyOn(Linking, "openURL")
      .mockResolvedValue(undefined);

    const { getByText } = renderScreen();
    fireEvent.press(getByText("LinkedIn"));

    expect(openURLSpy).toHaveBeenCalledWith(
      "https://www.linkedin.com/in/evgeny-ivanitsky",
    );
  });

  test("navigates back when the Back button is pressed", () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText("BACK"));
    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
  });
});
