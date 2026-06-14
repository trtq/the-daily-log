import React from "react";
import { render, fireEvent, waitFor } from "@/utils/test-utils";
import { LoginScreen } from "./LoginScreen";
import { supabase } from "@/services/supabase/client";
import { SCREENS } from "@/router/types";

jest.mock("@/services/supabase/client", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
  },
}));

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as any;

const renderScreen = () =>
  render(<LoginScreen navigation={mockNavigation} route={{} as any} />);

describe("LoginScreen", () => {
  test("renders the sign-in form", () => {
    const { getByText } = renderScreen();
    expect(getByText("Welcome Back")).toBeTruthy();
    expect(getByText("Email")).toBeTruthy();
    expect(getByText("Password")).toBeTruthy();
  });

  test("renders the sign-up navigation link", () => {
    const { getByText } = renderScreen();
    expect(getByText("Sign up")).toBeTruthy();
    expect(getByText("Don't have an account?")).toBeTruthy();
  });

  test("calls signInWithPassword with the entered credentials", async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      error: null,
    });

    const { getByTestId } = renderScreen();
    fireEvent.changeText(getByTestId("email-input"), "user@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.press(getByTestId("submit-button"));

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "password123",
      });
    });
  });

  test("shows an auth error message when sign-in fails", async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      error: { message: "Invalid login credentials" },
    });

    const { getByTestId, findByText } = renderScreen();
    fireEvent.changeText(getByTestId("email-input"), "wrong@example.com");
    fireEvent.changeText(getByTestId("password-input"), "wrongpass");
    fireEvent.press(getByTestId("submit-button"));

    expect(await findByText("Invalid login credentials")).toBeTruthy();
  });

  test("shows 'Signing in…' while the request is in flight", () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockReturnValue(
      new Promise(() => {}),
    );

    const { getByTestId, getByText } = renderScreen();
    fireEvent.changeText(getByTestId("email-input"), "user@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.press(getByTestId("submit-button"));

    expect(getByText("Signing in…")).toBeTruthy();
  });

  test("navigates to the sign-up screen when the link is pressed", () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText("Sign up"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.SignUp);
  });
});
