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
      return { ...state, ...action.payload };
    },
    logout: (state) =>{
      return initialState;
    } ,
  },
});

export const { setUserAuthenticated, logout } = userAuthenticatedSlice.actions;

export default userAuthenticatedSlice.reducer;
