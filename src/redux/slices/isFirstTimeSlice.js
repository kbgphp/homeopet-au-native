import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: true,
}


export const firstTimeSlice = createSlice({
  name: 'isFirstTime',
  initialState,
  reducers: {
    appOpened: (state) => {
      state.value = false
    },   
    resetFirstTime: (state) => {
      state.value = true
    },   
  },
})

// export the slice actions
export const { appOpened,resetFirstTime } = firstTimeSlice.actions;

// export the default reducer
export default firstTimeSlice.reducer

// export the selector Value
export const isFirstTimeSelector = (state) => state.isFirstTime;


