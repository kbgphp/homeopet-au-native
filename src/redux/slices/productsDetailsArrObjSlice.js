import { createSlice } from '@reduxjs/toolkit'
import { _REST } from '../../services';
import { store } from '../store';

const initialState = {
  productsDetailsArrObj: {},
  isProcessing: false,
  error: ''
}


export const productsDetailsArrObjSlice = createSlice({
  name: 'productsArrObj',
  initialState,
  reducers: {
    productFetchStart: (state) => {
      state.isProcessing = true;
      state.error = '';
    },
    productFetchSuccess: (state, action) => {
      state.productsDetailsArrObj = { ...action?.payload, ...state?.productsDetailsArrObj };
      state.isProcessing = false;
      state.error = '';
    },
    productFetchFromReduxSuccess: (state) => {
      state.isProcessing = false;
      state.error = '';
    },
    productFetchError: (state) => {
      state.isProcessing = false;
      state.error = 'Fetching failed';
    },
    resetProductsDetailsArrObj: (state) => {
      state.productsDetailsArrObj = {};
      state.isProcessing = false;
      state.error = '';
    },
  },
})


// export the slice actions
export const {
  productFetchStart,
  productFetchSuccess,
  productFetchFromReduxSuccess,
  productFetchError,
  resetProductsDetailsArrObj
} = productsDetailsArrObjSlice.actions;

// export the default reducer
export default productsDetailsArrObjSlice.reducer;


// User Actions
export const fetchProduct = (product_id) => async dispatch => {
  try {
    dispatch(productFetchStart());
    const DATA = store.getState();
    if (!!DATA?.productsArrObj?.productsDetailsArrObj?.[product_id]) {
      dispatch(productFetchFromReduxSuccess());
      return
    }
    const res = await _REST.CUSTOM_POST("product", { product_id: product_id, origin: 'au' });
    dispatch(res?.data ? productFetchSuccess({ [product_id]: res?.data }) : productFetchError())
    return res.data;
  } catch (e) {
    dispatch(productFetchError());
  }
}



