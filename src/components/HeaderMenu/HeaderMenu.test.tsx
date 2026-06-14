import React from "react";
import { render, fireEvent } from "@/utils/test-utils";
import { HeaderMenu, TMenuOption } from "./HeaderMenu";

const makeOptions = (): TMenuOption[] => [
  {
    iconName: "information-circle-outline",
    label: "Info",
    onPress: jest.fn(),
  },
  {
    iconName: "moon-outline",
    label: "Dark Mode",
    onPress: jest.fn(),
  },
  {
    iconName: "log-out-outline",
    label: "Log Out",
    onPress: jest.fn(),
    danger: true,
  },
];

describe("HeaderMenu", () => {
  test("renders all option labels when visible", () => {
    const { getByText } = render(
      <HeaderMenu
        visible={true}
        onClose={jest.fn()}
        options={makeOptions()}
        top={56}
        right={16}
      />,
    );
    expect(getByText("Info")).toBeTruthy();
    expect(getByText("Dark Mode")).toBeTruthy();
    expect(getByText("Log Out")).toBeTruthy();
  });

  test("renders nothing when not visible", () => {
    const { queryByText } = render(
      <HeaderMenu
        visible={false}
        onClose={jest.fn()}
        options={makeOptions()}
        top={56}
        right={16}
      />,
    );
    expect(queryByText("Info")).toBeNull();
  });

  test("calls the option's onPress and onClose when a menu item is tapped", () => {
    const onClose = jest.fn();
    const onInfoPress = jest.fn();
    const { getByText } = render(
      <HeaderMenu
        visible={true}
        onClose={onClose}
        options={[
          {
            iconName: "information-circle-outline",
            label: "Info",
            onPress: onInfoPress,
          },
        ]}
        top={56}
        right={16}
      />,
    );
    fireEvent.press(getByText("Info"));
    expect(onInfoPress).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
