import { createSlice } from "@reduxjs/toolkit";

const fetchStatusSlice = createSlice({
  name: "fetchStatus",
  initialState: {
    fetchDone: false,
    currentFetchStatus: false,
  },
  reducers: {
    markFetchDone: (state, action) => {
        //need to set fetchDone to true and return
        state.fetchDone=true;
 
    },
    currentFetchStatusStarted: (state, action) => {
        state.currentFetchStatus = true;
        
    },
    currentFetchStatusFinished: (state, action) => {
        state.currentFetchStatus = false;
        
    },
  },
});

export const fetchStatusActions = fetchStatusSlice.actions;
export default fetchStatusSlice;
