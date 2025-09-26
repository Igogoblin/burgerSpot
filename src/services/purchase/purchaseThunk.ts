import { createAsyncThunk } from '@reduxjs/toolkit';

import { createOrderApi } from './purchaseApi';

import type { IOrderResponse, AuthState } from '../types/types';

export const createOrder = createAsyncThunk<
  IOrderResponse,
  string[], // список id ингредиентов
  { rejectValue: string; state: { auth: AuthState } }
>('order/createOrder', async (ingredients, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user.accessToken;
    if (!token) return rejectWithValue('Нет accessToken');

    const res = await createOrderApi(ingredients, token);
    if (!res.success) return rejectWithValue(res.message ?? 'Ошибка заказа');

    return res;
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message ?? 'Ошибка сети');
  }
});
