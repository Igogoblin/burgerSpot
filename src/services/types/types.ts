import type { TIngredient } from '@/utils/types';

export type ICreateOrderResponse = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type IOrderState = {
  number: number | null;
  isLoading: boolean;
  error: string | null;
};

export type IApiErrorResponse = {
  success: boolean;
  message?: string;
};

export type TIngredientsState = {
  state: { success: boolean; data: TIngredient[] };
  ingredients: TIngredient[];
  listIngredients: TIngredient[];
  ingredient: TIngredient | null;
  type: string[];
  bun: boolean;
  isLoading: boolean;
  error: string | null;
};

export type IApiResponse = {
  success: boolean;
  message?: string;
};

export type IIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};
