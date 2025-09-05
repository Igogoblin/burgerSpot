import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth/authSlice';
import ingredientsSlice from './ingredientsSlice';
import orderSlice from './orderSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    order: orderSlice.reducer,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
