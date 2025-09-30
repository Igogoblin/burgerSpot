import { describe, expect, it } from 'vitest';

import reducer, { clearOrder } from './purchaseSlice';

describe('purchaseSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      order: null,
      isLoading: false,
      error: null,
    });
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
});
