import { describe, expect, it } from 'vitest';

import reducer, {
  setIngredientDetails,
  setType,
  setListIngredient,
  setBun,
  setDecrementIngredient,
  replaceListIngredient,
  orderClear,
} from './ingredientsSlice';

import type { TIngredient } from './../utils/types';

const mockIngredient = (id: string, name: string): TIngredient => ({
  _id: '',
  name,
  type: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 0,
  uniqueId: id,
});

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [] as TIngredient[],
    listIngredients: [] as TIngredient[],
    ingredient: null,
    type: ['bun', 'main', 'sauce'],
    bun: false,
    isLoading: false,
    error: null,
    state: {
      success: false,
      data: [],
    },
  };

  // it('should handle initial state', () => {
  //   expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  // });

  it('setIngredientDetails should set ingredient', () => {
    const ingredient = mockIngredient('123', 'test');
    const state = reducer(initialState, setIngredientDetails(ingredient));
    expect(state.ingredient).toEqual(ingredient);
  });

  it('setType should set type', () => {
    const type = ['bun', 'main', 'sauce'];
    const state = reducer(initialState, setType(type));
    expect(state.type).toEqual(type);
  });

  it('setListIngredient should set listIngredients', () => {
    const listIngredients = [mockIngredient('1', 'Tomato')];
    const state = reducer(initialState, setListIngredient(listIngredients));
    expect(state.listIngredients).toEqual(listIngredients);
  });

  it('replaceListIngredient should replace listIngredients', () => {
    const listIngredients = [mockIngredient('1', 'Tomato')];
    const state = reducer(initialState, replaceListIngredient(listIngredients));
    expect(state.listIngredients).toEqual(listIngredients);
  });

  it('setBun should set bun', () => {
    const state = reducer(initialState, setBun(true));
    expect(state.bun).toBe(true);
  });

  it('setDecrementIngredient should remove ingredient from listIngredients', () => {
    const listIngredients = [mockIngredient('1', 'Tomato')];
    reducer(initialState, setListIngredient(listIngredients));
    const state = reducer(
      initialState,
      setDecrementIngredient({
        uniqueId: '1',
      })
    );
    expect(state.listIngredients).toEqual([]);
  });

  it('orderClear should clear listIngredients', () => {
    const state = reducer(initialState, orderClear());
    expect(state.listIngredients).toEqual([]);
  });
});
