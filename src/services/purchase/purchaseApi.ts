import { request } from '../utils/request';

import type { IOrderResponse } from '../types/types';

export const createOrderApi = async (
  ingredients: string[],
  accessToken: string
): Promise<IOrderResponse> => {
  const res = await request<IOrderResponse>(`/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: withBearer(accessToken),
    },
    body: JSON.stringify({ ingredients }),
  });
  return res;
};

const withBearer = (token: string): string =>
  token.startsWith('Bearer ') ? token : `Bearer ${token}`;
