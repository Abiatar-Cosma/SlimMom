import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import authReducer from "./authSlice";

const savedAuth = JSON.parse(localStorage.getItem("slimmom-auth")) || {
  isLoggedIn: false,
  email: null,
};

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
  },
  preloadedState: {
    auth: savedAuth,
  },
});
