import { createSlice } from '@reduxjs/toolkit'
import { _REST } from '@src/services';

const initialState = {
  BIG_DATA: {},
  isProcessing: false,
}


export const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    appDataFetchStart: (state) => {
      state.isProcessing = true
    },
    appDataFetchSuccess: (state, action) => {
      state.BIG_DATA = action.payload;
      state.isProcessing = false;
    },
    appDataFetchError: (state) => {
      state.isProcessing = false;
    },
    resetAppData: (state) => {
      state.BIG_DATA = {};
      state.isProcessing = false;
    },
  },
})


// export the slice actions
export const { appDataFetchStart, appDataFetchSuccess, appDataFetchError, resetAppData } = appDataSlice.actions;

// export the default reducer
export default appDataSlice.reducer;

// export the selector Value
export const appDataSliceSelector = (state) => state.appData;


// User Actions
export const getAppData = () => async dispatch => {
  try {
    dispatch(appDataFetchStart());
    const res = await _REST.POST("tabs-data", { "origin": "au" });
    dispatch(res?.data ? appDataFetchSuccess(res?.data) : appDataFetchError());
    return res?.data
  } catch (e) {
    dispatch(appDataFetchError());
  }
}