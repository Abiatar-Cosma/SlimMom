import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui/uiSlice";
import authReducer from "./auth/auth-slice"; // ✅ import nou

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer, // ✅ adăugat în store
  },
});
