import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ORDER_API_URL } from './constants/constants';

import type {
  IApiErrorResponse,
  ICreateOrderResponse,
  IOrderState,
} from './types/types';

export const createOrder = createAsyncThunk<number, string[], { rejectValue: string }>(
  'order/createOrder',
  async (ingredientIds, { rejectWithValue }) => {
    try {
      const response = await fetch(ORDER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });
      const responseBody = (await response.json()) as ICreateOrderResponse;
      if (!response.ok) {
        const error = responseBody as IApiErrorResponse;
        return rejectWithValue(error.message ?? 'Failed to create order');
      }
      const data: ICreateOrderResponse = responseBody;
      return data.order.number;
    } catch (error) {
      console.error('Error creating order:', error);
      return rejectWithValue('Failed to create order');
    }
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
