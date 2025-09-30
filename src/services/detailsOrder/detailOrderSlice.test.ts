import { describe, expect, it } from 'vitest';

import reducer, { setDetailsOrder, clearDetailsOrder } from './detailOrderSlice';
import { fetchOrderByNumber } from './detailsOrderThunk';

import type { TOrder } from '../types/types';

describe('detailsOrderSlice', () => {
  const initialState = {
    detailsOrder: null,
    isLoading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('setDetailsOrder can save order', () => {
    const order: TOrder = {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'testSaveOrder',
      number: 123,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    };

    const state = reducer(initialState, setDetailsOrder(order));
    expect(state.detailsOrder).toEqual(order);
  });

  it('clearDetailsOrder can clear order', () => {
    const modifiedState = {
      ...initialState,
      detailsOrder: {
        _id: '1',
        ingredients: ['1', '2'],
        status: 'done' as const,
        name: 'testSaveOrder',
        number: 123,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      } as TOrder,
    };

    const state = reducer(modifiedState, clearDetailsOrder());
    expect(state).toEqual(initialState);
  });

  it('fetchOrderByNumber pending, need to change isLoading to true', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchOrderByNumber fulfilled, need to save order and change isLoading to false', () => {
    const order: TOrder = {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'testSaveOrder',
      number: 123,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    };
    const action = { type: fetchOrderByNumber.fulfilled.type, payload: order };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.detailsOrder).toEqual(order);
  });

  it('fetchOrderByNumber rejected, need to change isLoading to false', () => {
    const action = { type: fetchOrderByNumber.rejected.type, payload: 'error' };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');
  });

  it('should handle unknown action', () => {
    const action = { type: 'unknown' };
    const state = reducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
