import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth/authSlice';
import ingredientsSlice from './ingredientsSlice';
import { ordersMiddleware } from './orders/ordersMiddleware';
import feedSlice from './orders/ordersSlice';
import orderSlice from './orderSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    order: orderSlice.reducer,
    auth: authSlice,
    orders: feedSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ordersMiddleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
