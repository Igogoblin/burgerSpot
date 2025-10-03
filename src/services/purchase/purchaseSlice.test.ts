import { describe, expect, it } from 'vitest';

import { order } from '../detailsOrder/detailOrderSlice.test';
import reducer, { clearOrder, initialState } from './purchaseSlice';
import { createOrder } from './purchaseThunk';

describe('purchaseSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('clearOrder should clear order', () => {
    const state = reducer(
      { order: { number: 1 }, isLoading: true, error: 'error' },
      clearOrder()
    );
    expect(state.order).toBe(null);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('purchase pending', () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('purchase fulfilled', () => {
    const action = { type: createOrder.fulfilled.type, payload: { order } };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('purchase rejected', () => {
    const action = { type: createOrder.rejected.type, payload: 'error' };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');
  });
});
