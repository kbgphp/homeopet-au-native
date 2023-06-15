import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import expireReducer from 'redux-persist-expire';

import isFirstTimeSlice from "./slices/isFirstTimeSlice";
import appDataSlice from "./slices/appDataSlice";
import productsListSlice from "./slices/productsListSlice";
import productsDetailsArrObjSlice from "./slices/productsDetailsArrObjSlice";
import notificationSlice from "./slices/notificationSlice";


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [
    expireReducer('productsArrObj', {
      expireSeconds: 6*3600,
      expiredState: {
        productsDetailsArrObj: {},
        isProcessing: false,
        error: ''
      },
      autoExpire: true
    })
  ]
}

const rootReducer = combineReducers({
  isFirstTime: isFirstTimeSlice,
  appData: appDataSlice,
  recProducts: productsListSlice,
  productsArrObj: productsDetailsArrObjSlice,
  notification: notificationSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)




