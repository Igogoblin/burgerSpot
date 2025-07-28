import { configureStore } from '@reduxjs/toolkit';

import ingredientsSlice from './ingredientsSlice';
import orderSlice from './orderSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    order: orderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
