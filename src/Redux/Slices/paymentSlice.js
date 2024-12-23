import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  account: "",
  balance: 0,
  description: "",
  amount: 0,
  transaction_date: "",
  loading: false,
  error: null,
};


const paymentSlice = createSlice({
  name: 'paymentReducer',
  initialState,
  reducers: {
    setPayment:(state, action) => {
      return {...state, ...action.payload}
    }
  },
  
});

export const {setPayment} = paymentSlice.actions;

export default paymentSlice.reducer;


