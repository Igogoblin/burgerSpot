import { createSlice } from '@reduxjs/toolkit';

import { fetchOrderByNumber } from './detailsOrderThunk';

import type { TOrder } from '../types/types';
import type { PayloadAction } from '@reduxjs/toolkit';

type TDetailsOrderState = {
  detailsOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TDetailsOrderState = {
  detailsOrder: null,
  isLoading: false,
  error: null,
};

const detailsOrderSlice = createSlice({
  name: 'detailsOrder',
  initialState,
  reducers: {
    setDetailsOrder(state, action: PayloadAction<TOrder | null>) {
      state.detailsOrder = action.payload;
    },
    clearDetailsOrder(state) {
      state.detailsOrder = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detailsOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка при загрузке заказа';
      });
  },
});

export const { setDetailsOrder, clearDetailsOrder } = detailsOrderSlice.actions;
export default detailsOrderSlice.reducer;
