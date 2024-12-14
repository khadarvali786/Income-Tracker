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
    investment: {},
    investments: [
    ],
  },
  reducers: {
    setInvestment: (state, action) => {
      return { ...state, investment: action.payload };
    },
    setData: (state, action) => {
      return { ...state, data: [...state.data, action.payload] };
    },
    updateInvestmentStatus:(state ,action)=>{
        console.log("Khadar: update"+JSON.stringify(action.payload));
        return {
            ...state,
            data: state.data.map((item)=>{
                if(item.id===action.payload.id){
                    return {...item, investmentStatus:action.payload.investmentStatus};
                }
                return item;
            })
        }
    },
    setInvestments: (state, action) => {
        //Need investment id in sequence
        const investmentId = state.investments.length + 1;
        action.payload.investmentId = investmentId;
        //investmentDate should contain date
        action.payload.investmentDate = new Date().toISOString().split("T")[0];
        return {
         ...state,
          investments: [...state.investments, action.payload],
        };
    //   return { ...state, investments: [...state.investments, action.payload] };
    },
  },
});

const investmentSlice = createSlice({
  name: "investment",
  initialState: {
    investments: [
      {
        investmentId: 1,
        investmentName: "Investment 1",
        investmentAmount: 1000,
        investmentDate: "2020-01-01",
        investmentStatus: "Invested",
      },
      {
        investmentId: 2,
        investmentName: "Investment 2",
        investmentAmount: 2000,
        investmentDate: "2020-02-01",
        investmentStatus: "Not Invested",
      },
    ],
    TotalInvetmentAmmount: 0,
  },
  reducers: {
    setTotalInvetmentAmmount: (state) => {
      return {
        ...state,
        TotalInvetmentAmmount: state.investments.reduce(
          (sum, investment) => sum + investment.investmentAmount,
          0
        ),
      };
    },
  },
});

const myStore = configureStore({
  reducer: {
    income: incomeSlice.reducer,
    data: dataSlice.reducer,
    investment: investmentSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const incomeActions = incomeSlice.actions;
export const dataActions = dataSlice.actions;
export const investmentActions = investmentSlice.actions;
export default myStore;
