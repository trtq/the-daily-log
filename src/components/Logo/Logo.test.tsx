import React from "react";
import { render } from "@/utils/test-utils";
import { Logo } from "./Logo";

describe("Logo", () => {
  test("renders the app name", () => {
    const { getByText } = render(<Logo />);
    expect(getByText("THE DAILY LOG")).toBeTruthy();
  });

  test("renders the tagline subtitle", () => {
    const { getByText } = render(<Logo />);
    expect(
      getByText("a daily record of thoughts, ideas, and observations"),
    ).toBeTruthy();
  });
});
