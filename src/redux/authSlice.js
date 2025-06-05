import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    email: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload;
      localStorage.setItem(
        "slimmom-auth",
        JSON.stringify({ isLoggedIn: true, email: action.payload })
      );
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      localStorage.removeItem("slimmom-auth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
