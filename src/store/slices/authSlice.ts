import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthState = {
  token: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null } as TAuthState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
