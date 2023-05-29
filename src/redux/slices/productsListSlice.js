import { createSlice } from '@reduxjs/toolkit'
import { _REST } from '../../services';

const initialState = {
  PRODUCTS: {},
  isProcessing: false,
}


export const productsListSlice = createSlice({
  name: 'recProducts',
  initialState,
  reducers: {
    productsFetchStart: (state) => {
      state.isProcessing = true
    },
    productsFetchSuccess: (state, action) => {
      state.PRODUCTS = action.payload;
      state.isProcessing = false;
    },
    productsFetchError: (state) => {
      state.isProcessing = false;
    },
    resetProducts: (state) => {
      state.PRODUCTS = {};
      state.isProcessing = false;
    },
  },
})


// export the slice actions
export const { productsFetchStart, productsFetchSuccess, productsFetchError, resetProducts } = productsListSlice.actions;

// export the default reducer
export default productsListSlice.reducer;

// export the selector Value
export const productsSliceSelector = (state) => state;




// User Actions
export const fetchProducts = (symptom_id) => async dispatch => {
  try {
    dispatch(productsFetchStart());
    const res = await _REST.CUSTOM_POST("symptom-products", { symptom_id });
    dispatch(productsFetchSuccess(res?.data?.medicines));
    return res.data
  } catch (e) {
    console.log('e: ', e);
    dispatch(productsFetchError());
  }
}



