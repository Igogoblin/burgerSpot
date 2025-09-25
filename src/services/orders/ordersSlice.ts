import { createSlice } from '@reduxjs/toolkit';

import type { TOrder, TOrdersState } from '../types/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: TOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  connected: false,
  completedOrders: [],
  pendingOrders: [],
  // error: null,
};

const feedSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    wsConnecting(state) {
      state.connected = false;
    },
    wsDisconnecting(state) {
      state.connected = false;
    },
    wsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.connected = false;
    },
    wsMessage: (
      state,
      action: PayloadAction<{ orders: TOrder[]; total: number; totalToday: number }>
    ) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.completedOrders = state.orders.filter((order) => order.status === 'done');
      state.pendingOrders = state.orders.filter((order) => order.status !== 'done');
      // console.log('state.completedOrders', state.completedOrders);
      // console.log('state.pendingOrders', state.pendingOrders);
      // console.log(state.orders);
    },
  },
});

export const { wsConnecting, wsDisconnecting, wsError, wsMessage } = feedSlice.actions;
export default feedSlice;
