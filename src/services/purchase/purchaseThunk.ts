import { createAsyncThunk } from '@reduxjs/toolkit';

import { createOrderApi } from './purchaseApi';

import type { IOrderResponse, AuthState, TOrder, TOrdersResponse } from '../types/types';

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

export const fetchOrderDetails = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('orders/fetchOrderDetails', async (orderNumber, { rejectWithValue }) => {
  try {
    const res = await fetch(
      `https://norma.nomoreparties.space/api/orders/${orderNumber}`
    );

    if (!res.ok) {
      return rejectWithValue('Ошибка при загрузке заказа');
    }

    const data = (await res.json()) as TOrdersResponse;

    if (!data.success || !data.orders?.length) {
      return rejectWithValue(data.message ?? 'Заказ не найден');
    }

    return data.orders[0]; // вернём первый заказ
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message ?? 'Ошибка сети');
  }
});
