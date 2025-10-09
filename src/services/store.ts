import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth/authSlice';
import detailsOrderSlice from './detailsOrder/detailOrderSlice';
import ingredientsSlice from './ingredientsSlice';
import { ordersMiddleware } from './orders/ordersMiddleware';
import ordersSlice from './orders/ordersSlice';
import purchaseSlice from './purchase/purchaseSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    orders: ordersSlice,
    auth: authSlice,
    purchase: purchaseSlice,
    detailsOrder: detailsOrderSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ordersMiddleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
