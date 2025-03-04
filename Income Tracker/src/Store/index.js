import { configureStore, createSlice } from "@reduxjs/toolkit";
import { fetchDataFromDb, fetchUserInfo } from "../Services/api";
import fetchStatusSlice, { fetchStatusActions } from "./fetchStatusSlice";

const incomeSlice = createSlice({
  name: "income",
  initialState: "",
  reducers: {
    setIncome: (state, action) => {
      return action.payload;
    },
  },
});

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    loans:"",
    cardBills:"",
    policies:"",
  },
  reducers: {
    setLoans: (state, action) => {
      return { ...state, loans: action.payload };
    },
    setCardBills: (state, action) => {
      return { ...state, cardBills: action.payload };
    },
    setPolicies: (state, action) => {
      return { ...state, policies: action.payload };
    },
  }
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
    // alterInvestmentData:(state,action)=>{
    //   console.log("alterInvestmentData"+JSON.stringify(action.payload));
    // },
    setDbData:(state,action)=>{
      return {...state,data:action.payload}
    }
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      return {...state, user: action.payload };
    },
    clearUser: () => {
      return { user: null };
    },
  },
})

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
    user: userSlice.reducer,
    fetchStatus:fetchStatusSlice.reducer,
    expenses : expenseSlice.reducer,

  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Thunk to fetch data from the server
export const fetchDataThunk = (userId) => async (dispatch) => {
  try {
    console.log('Fetching data from server:'+userId);
    const data = await fetchDataFromDb();
    console.log("Fetched data:", data); // Log the fetched data for debugging
    dispatch(dataActions.setDbData(data)); // Dispatch the setData action
  } catch (error) {
    console.error("Error in fetchDataThunk:", error);
  }
};

// Thunk to fetch userInformation
export const fetchUserInformationThunk = () => async (dispatch) => {
  try {
    dispatch(fetchStatusActions.currentFetchStatusStarted());
    const user = await fetchUserInfo(); 
    console.log("User status:", user.status); // Check if the user is authenticated or not
    if (user.status) {
      console.log("Fetched user information:", user);
      dispatch(fetchStatusActions.markFetchDone());
      dispatch(userActions.setUser(user));
      dispatch(fetchStatusActions.currentFetchStatusFinished());
    } else {
      console.log("User is not authenticated.");
      dispatch(fetchStatusActions.markFetchDone());
      dispatch(userActions.clearUser()); // Clear user state if not authenticated
      dispatch(fetchStatusActions.currentFetchStatusFinished());
    }
  } catch (error) {
    console.error("Error in fetchUserInformationThunk:", error);
  }
}

export const incomeActions = incomeSlice.actions;
export const expenseActions = expenseSlice.actions;
export const dataActions = dataSlice.actions;
export const investmentActions = investmentSlice.actions;
export const userActions = userSlice.actions;
export default myStore;
