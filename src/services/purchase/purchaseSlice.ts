import { createSlice } from '@reduxjs/toolkit';

import { createOrder } from './purchaseThunk';

import type { TOrderState } from '../types/types';

export const initialState: TOrderState = {
  order: null,
  isLoading: false,
  error: null,
};

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Mistake при loader order';
      });
  },
});

export const { clearOrder } = purchaseSlice.actions;
export default purchaseSlice.reducer;
