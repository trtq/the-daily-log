import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthState = {
  token: string | null;
  userId: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, userId: null } as TAuthState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; userId: string }>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    clearAuth: (state) => {
      state.token = null;
      state.userId = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
