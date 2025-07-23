import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}`);
  }
  const result = (await response.json()) as { data: TIngredient[] };
  if (!('data' in result) || !Array.isArray(result.data)) {
    throw new Error('Invalid data format');
  }
  return result.data;
});

export type TIngredientsState = {
  ingredients: TIngredient[];
  listIngredients: TIngredient[];
  ingredient: TIngredient | null;
  type: string[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  listIngredients: [],
  ingredient: null,
  type: ['bun', 'main', 'sauce'],
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredient(state, action: { payload: TIngredient }) {
      state.ingredient = action.payload;
    },
    setType(state, action: { payload: string[] }) {
      state.type = action.payload;
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
export const { setIngredient, setType } = ingredientsSlice.actions;
export { fetchIngredients };
