import { configureStore } from '@reduxjs/toolkit';

import ingredientsSlice from './ingredientsSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
