import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL } from './constants/constants';

import type { TIngredientsState } from './types/types';
import type { TIngredient } from '@/utils/types';

const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}`);
  }
  const result = (await response.json()) as { data: TIngredient[] };
  if (!('data' in result) || !Array.isArray(result.data)) {
    throw new Error('Invalid data format');
  }
  return result.data;
});

const initialState: TIngredientsState = {
  ingredients: [],
  listIngredients: [],
  ingredient: null,
  type: ['bun', 'main', 'sauce'],
  bun: false,
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredientDetails(state, action: { payload: TIngredient }) {
      state.ingredient = action.payload;
    },
    setType(state, action: { payload: string[] }) {
      state.type = action.payload;
    },
    setListIngredient(state, action: { payload: TIngredient[] }) {
      for (const ingredient of action.payload) {
        if (ingredient.type === 'bun') {
          const bunIndex = state.listIngredients.findIndex(
            (item) => item.type === 'bun'
          );
          if (bunIndex !== -1) {
            state.listIngredients[bunIndex] = ingredient;
          } else {
            state.listIngredients.push(ingredient);
          }
        } else {
          state.listIngredients.push(ingredient);
        }
      }
    },
    replaceListIngredient(state, action: { payload: TIngredient[] }) {
      state.listIngredients = action.payload;
    },
    setBun(state, action: { payload: boolean }) {
      state.bun =
        state.listIngredients.some((item) => item.type === 'bun') || action.payload;
    },
    setDecrimentIngredient(state, action: { payload: { _id: string } }) {
      const index = state.listIngredients.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.listIngredients.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state: TIngredientsState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state: TIngredientsState, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state: TIngredientsState, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch ingredients';
      });
  },
});

export default ingredientsSlice;
export const {
  setIngredientDetails,
  setType,
  setListIngredient,
  setBun,
  setDecrimentIngredient,
  replaceListIngredient,
} = ingredientsSlice.actions;
export { fetchIngredients };
