import { configureStore } from "@reduxjs/toolkit";
import userAuthenticatedReducer from "./Slices/userAuthenticatedSlice";

const store = configureStore({
  reducer: {
    userAuthenticated: userAuthenticatedReducer,
  },
});

export default store;
