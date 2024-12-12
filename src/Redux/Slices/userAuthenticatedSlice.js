import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  role: "",
  firstName: "",
  lastName: "",
  email: "",
};

export const userAuthenticatedSlice = createSlice({
  name: "userAuthenticatedReducer",
  initialState,
  reducers: {
    setUserAuthenticated: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setUserAuthenticated } = userAuthenticatedSlice.actions;

export default userAuthenticatedSlice.reducer;
