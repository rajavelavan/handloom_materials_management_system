import { configureStore } from '@reduxjs/toolkit';
import purchaseReducer from './features/purchaseSlice';
import salesReducer from './features/salesSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
    reducer: {
      purchase: purchaseReducer,
      sales: salesReducer,
      user: userReducer,
    },
})