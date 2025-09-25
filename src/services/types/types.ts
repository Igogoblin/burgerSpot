// import { ingredients } from './../../utils/ingredients';
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
  refreshToken(arg0: string, refreshToken: unknown): unknown;
  success: boolean;
  message?: string;
};
export type IIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};
export type IUser = {
  email: string;
  name: string;
};
export type IAuthResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
  message?: string;
};

export type ITokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};
export type AuthState = {
  forgot: {
    email: string | null;
    isLoading: boolean;
    error: string | null;
  };
  reset: {
    isLoading: boolean;
    error: string | null;
    message: string | null;
  };
  user: {
    data: IUser | null;
    accessToken: string | null;
    isAuthChecked: boolean;
    isLoading: boolean;
    error: string | null;
  };
};

// for WebSocket order feed
export type TOrder = {
  ingredients: string[];
  _id: string;
  status: 'done' | 'created' | 'pending';
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type TOrdersState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  connected: boolean;
  error?: string | null;
  completedOrders: TOrder[];
  pendingOrders: TOrder[] | null;
};

export type TOrdersResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};
