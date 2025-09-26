import { request } from '../utils/request';

import type { IApiResponse, IAuthResponse, ITokenResponse, IUser } from '../types/types';

export const forgotPasswordApi = async (email: string): Promise<IApiResponse> => {
  const res = await request<IApiResponse>(`/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return res;
};

// API для сброса пароля
export const resetPasswordApi = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}): Promise<IApiResponse> => {
  const res = await request<IApiResponse>(`/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, token }),
  });
  return res;
};

// API для регистрации
export const registerApi = async (body: {
  email: string;
  password: string;
  name: string;
}): Promise<IAuthResponse> => {
  const res = await request<IAuthResponse>(`/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res;
};
export const loginApi = async (body: {
  email: string;
  password: string;
}): Promise<IAuthResponse> => {
  const res = await request<IAuthResponse>(`/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res;
};

export const logoutApi = async (refreshToken: string): Promise<IApiResponse> => {
  const res = await request<IApiResponse>(`/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  });
  return res;
};

export const refreshTokenApi = async (refreshToken: string): Promise<ITokenResponse> => {
  const res = await request<ITokenResponse>(`/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  });
  return res;
};

export const getUserApi = async (
  accessToken: string
): Promise<{ success: boolean; user: IUser }> => {
  const res = await request<{ success: boolean; user: IUser }>(`/auth/user`, {
    method: 'GET',
    headers: { Authorization: withBearer(accessToken) },
  });
  return res;
};

export const updateUserApi = async (
  accessToken: string,
  body: { email?: string; name?: string; password?: string }
): Promise<{ success: boolean; user: IUser }> => {
  const res = await request<{ success: boolean; user: IUser }>(`/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: withBearer(accessToken),
    },
    body: JSON.stringify(body),
  });
  return res;
};
const withBearer = (token: string): string =>
  token.startsWith('Bearer ') ? token : `Bearer ${token}`;
