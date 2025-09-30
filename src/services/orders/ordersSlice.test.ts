import { describe, expect, it } from 'vitest';

import reducer, {
  wsConnecting,
  wsDisconnecting,
  wsError,
  wsMessage,
  wsOpen,
} from './ordersSlice';

import type { TOrder, TOrdersState } from '../types/types';

const initialState: TOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  connected: false,
  completedOrders: [],
  pendingOrders: [],
  error: null,
};

const mockOrders: TOrder[] = [
  {
    _id: '1',
    ingredients: ['a', 'b'],
    status: 'done',
    name: 'Order1',
    number: 101,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
  {
    _id: '2',
    ingredients: ['c'],
    status: 'pending',
    name: 'Order2',
    number: 102,
    createdAt: '2023-01-02',
    updatedAt: '2023-01-02',
  },
];

describe('ordersSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('wsConnecting should set connected to false', () => {
    const state = reducer(initialState, wsConnecting(undefined));
    expect(state.connected).toBe(false);
  });

  it('wsDisconnecting should set connected to false', () => {
    const modified = { ...initialState, connected: true };
    const state = reducer(modified, wsDisconnecting());
    expect(state.connected).toBe(false);
  });

  it('wsError should set connected to false', () => {
    const state = reducer(initialState, wsError('error'));
    expect(state.error).toBe('error');
    expect(state.connected).toBe(false);
  });

  it('wsMessage should set orders, total, totalToday', () => {
    const state = reducer(
      initialState,
      wsMessage({ orders: mockOrders, total: 2, totalToday: 1 })
    );
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(2);
    expect(state.totalToday).toBe(1);
    expect(state.completedOrders).toEqual(
      mockOrders.filter((order) => order.status === 'done')
    );
    expect(state.pendingOrders).toEqual(
      mockOrders.filter((order) => order.status !== 'done')
    );
  });

  it('wsOpen should set connected to true and clear error', () => {
    const modified = { ...initialState, error: 'error' };
    const state = reducer(modified, wsOpen());
    expect(state.error).toBe(null);
    expect(state.connected).toBe(true);
  });
});
