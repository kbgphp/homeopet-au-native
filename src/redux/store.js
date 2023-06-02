import { configureStore ,combineReducers} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import isFirstTimeSlice from "./slices/isFirstTimeSlice";
import appDataSlice from "./slices/appDataSlice";
import productsListSlice from "./slices/productsListSlice";
import productDetailsSlice from "./slices/productDetailsSlice";
import notificationSlice from "./slices/notificationSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,  
}

const rootReducer = combineReducers({
  isFirstTime:isFirstTimeSlice,
  appData:appDataSlice,
  recProducts:productsListSlice,
  productData:productDetailsSlice,
  notification:notificationSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)




