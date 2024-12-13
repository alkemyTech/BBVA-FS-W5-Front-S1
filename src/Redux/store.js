import { configureStore } from "@reduxjs/toolkit";
import userAuthenticatedReducer from "./Slices/userAuthenticatedSlice";
import paymentReducer from "./Slices/paymentSlice";

const store = configureStore({
  reducer: {
    userAuthenticated: userAuthenticatedReducer,
    payment: paymentReducer,
  },
});

export default store;
