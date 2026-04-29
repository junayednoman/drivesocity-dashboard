
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../store";

type TAuthType = {
  user: null | { email: string, role: "admin" },
  token: null | string;
}

const initialState: TAuthType = {
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      // set cookie for middleware access
      Cookies.set("driveSocietyAccessToken", token, { path: "/" });
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      // Remove token for cookies
      Cookies.remove("driveSocietyAccessToken", { path: "/" });
    }
  }
})

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;