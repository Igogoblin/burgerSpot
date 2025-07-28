import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { request } from './utils/request';

import type { ICreateOrderResponse, IOrderState } from './types/types';

export const createOrder = createAsyncThunk<number, string[], { rejectValue: string }>(
  'order/createOrder',
  async (ingredientIds) => {
    const data = await request<ICreateOrderResponse>('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: ingredientIds }),
    });

    return data.order.number;
  }
);

const initialState: IOrderState = {
  number: null,
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.number = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state: IOrderState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state: IOrderState, action) => {
        state.isLoading = false;
        state.number = action.payload;
      })
      .addCase(createOrder.rejected, (state: IOrderState, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to create order';
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice;
