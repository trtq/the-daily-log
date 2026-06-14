import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  isAuthenticated: boolean;
};

const initialState: TAuthState = { isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false },
  reducers: {
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    clearAuth: () => initialState,
  },
});

export const { setAuthenticated, clearAuth } = authSlice.actions;
export default authSlice.reducer;
