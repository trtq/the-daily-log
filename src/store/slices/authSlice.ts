import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  isAuthenticated: boolean;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false } as TAuthState,
  reducers: {
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthenticated, clearAuth } = authSlice.actions;
export default authSlice.reducer;
