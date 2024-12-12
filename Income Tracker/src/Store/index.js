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
const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    investment: null,
  },
  reducers: {
    setInvestment: (state, action) => {
      return { ...state, investment: action.payload };
    },
    setData: (state, action) => {
      return { ...state, data: [...state.data, action.payload] };
    },
  },
});

const myStore = configureStore({
  reducer: {
    income: incomeSlice.reducer,
    data: dataSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const incomeActions = incomeSlice.actions;
export const dataActions = dataSlice.actions;
export default myStore;
