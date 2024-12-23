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
    updateUserAttribute: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value; 
    },
  },
});

export const { setUserAuthenticated, logout, updateUserAttribute } = userAuthenticatedSlice.actions;

export default userAuthenticatedSlice.reducer;
