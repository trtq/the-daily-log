import React from "react";
import { render as rtlRender } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { themes } from "@/utils/themes";
import { type RootState } from "@/store/store";
import authReducer from "@/store/slices/authSlice";
import entriesReducer from "@/store/slices/entriesSlice";
import syncReducer from "@/store/slices/syncSlice";

export const render = (ui: React.ReactElement) =>
  rtlRender(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={themes.light}>{children}</ThemeProvider>
    ),
  });

export const renderWithStore = (
  ui: React.ReactElement,
  preloadedState: Partial<RootState> = {},
) => {
  const testStore = configureStore({
    reducer: {
      auth: authReducer,
      entries: entriesReducer,
      sync: syncReducer,
    },
    preloadedState: preloadedState as RootState,
  });
  return {
    ...render(<Provider store={testStore}>{ui}</Provider>),
    testStore,
  };
};

export * from "@testing-library/react-native";
