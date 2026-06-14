import React from "react";
import { render, fireEvent, waitFor } from "@/utils/test-utils";
import { SignUpScreen } from "./SignUpScreen";
import { supabase } from "@/services/supabase/client";

jest.mock("@/services/supabase/client", () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as any;

const renderScreen = () =>
  render(<SignUpScreen navigation={mockNavigation} route={{} as any} />);

describe("SignUpScreen", () => {
  test("renders the create-account form", () => {
    const { getByText } = renderScreen();
    expect(getByText("New Here?")).toBeTruthy();
    expect(getByText("Email")).toBeTruthy();
    expect(getByText("Password")).toBeTruthy();
    expect(getByText("Confirm Password")).toBeTruthy();
  });

  test("shows an email validation error when the email field is blurred empty", () => {
    const { getByTestId, getByText } = renderScreen();
    fireEvent(getByTestId("email-input"), "blur");
    expect(getByText("Email is required")).toBeTruthy();
  });

  test("shows a password validation error when the password field is blurred empty", () => {
    const { getByTestId, getByText } = renderScreen();
    fireEvent(getByTestId("password-input"), "blur");
    expect(getByText("Password is required")).toBeTruthy();
  });

  test("blocks submission and shows mismatch error when passwords do not match", async () => {
    const { getByTestId, findByText } = renderScreen();

    fireEvent.changeText(getByTestId("email-input"), "user@test.com");
    fireEvent.changeText(getByTestId("password-input"), "secret123");
    fireEvent.changeText(getByTestId("confirm-input"), "different");
    fireEvent.press(getByTestId("submit-button"));

    expect(await findByText("Passwords do not match")).toBeTruthy();
    expect(supabase.auth.signUp).not.toHaveBeenCalled();
  });

  test("calls signUp with valid credentials and matching passwords", async () => {
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({ error: null });

    const { getByTestId } = renderScreen();
    fireEvent.changeText(getByTestId("email-input"), "user@test.com");
    fireEvent.changeText(getByTestId("password-input"), "secret123");
    fireEvent.changeText(getByTestId("confirm-input"), "secret123");
    fireEvent.press(getByTestId("submit-button"));

    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: "user@test.com",
        password: "secret123",
      });
    });
  });

  test("shows an auth error message when sign-up fails", async () => {
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      error: { message: "Email already registered" },
    });

    const { getByTestId, findByText } = renderScreen();
    fireEvent.changeText(getByTestId("email-input"), "taken@test.com");
    fireEvent.changeText(getByTestId("password-input"), "secret123");
    fireEvent.changeText(getByTestId("confirm-input"), "secret123");
    fireEvent.press(getByTestId("submit-button"));

    expect(await findByText("Email already registered")).toBeTruthy();
  });

  test("shows 'Creating account…' while the request is in flight", () => {
    (supabase.auth.signUp as jest.Mock).mockReturnValue(new Promise(() => {}));

    const { getByTestId, getByText } = renderScreen();
    fireEvent.changeText(getByTestId("email-input"), "user@test.com");
    fireEvent.changeText(getByTestId("password-input"), "secret123");
    fireEvent.changeText(getByTestId("confirm-input"), "secret123");
    fireEvent.press(getByTestId("submit-button"));

    expect(getByText("Creating account…")).toBeTruthy();
  });

  test("navigates back when the 'Sign in' link is pressed", () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText("Sign in"));
    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
  });
});
