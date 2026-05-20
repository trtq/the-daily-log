import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import entriesReducer from "./slices/entriesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    entries: entriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
