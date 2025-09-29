import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TOrder } from '../types/types';

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  string,
  { rejectValue: string }
>('detailsOrder/fetchByNumber', async (number, { rejectWithValue }) => {
  try {
    const res = await fetch(`https://norma.nomoreparties.space/api/orders/${number}`);
    if (!res.ok) {
      throw new Error(`Ошибка ${res.status}`);
    }
    const data = (await res.json()) as { orders: TOrder[] };
    if (!data.orders?.[0]) {
      throw new Error('Заказ не найден');
    }
    return data.orders[0];
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message ?? 'Ошибка сети');
  }
});
