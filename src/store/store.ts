import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./slices/authSlice";
import entriesReducer from "./slices/entriesSlice";
import syncReducer from "./slices/syncSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    entries: entriesReducer,
    sync: syncReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
