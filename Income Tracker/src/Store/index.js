import { configureStore, createSlice } from "@reduxjs/toolkit";

const incomeSlice = createSlice({
  name: "income",
  initialState: 0,
  reducers: {
    setIncome: (state, action) => {
      return action.payload;
    },
  },
});

const myStore = configureStore({
  reducer: {
    income: incomeSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const incomeActions = incomeSlice.actions;
export default myStore;
