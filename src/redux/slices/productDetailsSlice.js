import { createSlice } from '@reduxjs/toolkit'
import { _REST } from '../../services';

const initialState = {
  data: {},
  isProcessing: false,
  error: ''
}


export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    productDetailsFetchStart: (state) => {
      state.isProcessing = true;
      state.data = {};
      state.error = '';
    },
    productDetailsFetchSuccess: (state, action) => {
      state.data = action.payload;
      state.isProcessing = false;
      state.error = '';
    },
    productDetailsFetchError: (state) => {
      state.isProcessing = false;
      state.error = 'Fetching failed';
    },
    resetProductDetails: (state) => {
      state.data = {};
      state.isProcessing = false;
      state.error = '';
    },
  },
})


// export the slice actions
export const { productDetailsFetchStart, productDetailsFetchSuccess, productDetailsFetchError, resetProductDetails } = productDetailsSlice.actions;

// export the default reducer
export default productDetailsSlice.reducer;

// export the selector Value
export const productDetailsSliceSelector = (state) => state;




// User Actions
export const fetchProductDetails = (product_id) => async dispatch => {
  try {
    dispatch(productDetailsFetchStart());
    const res = await _REST.CUSTOM_POST("product", { product_id: product_id, origin: 'au' });
    dispatch(res?.data ? productDetailsFetchSuccess(res?.data) : productDetailsFetchError())
    return res.data;
  } catch (e) {
    dispatch(productDetailsFetchError());
  }
}



