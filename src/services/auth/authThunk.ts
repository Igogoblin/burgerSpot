import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  forgotPasswordApi,
  resetPasswordApi,
  registerApi,
  getUserApi,
  loginApi,
  logoutApi,
  refreshTokenApi,
  updateUserApi,
} from './authApi';

import type {
  AuthState,
  IApiResponse,
  IAuthResponse,
  ITokenResponse,
  IUser,
} from '../types/types';

// Thunk для восстановления пароля
export const forgotPassword = createAsyncThunk<
  IApiResponse,
  string,
  { rejectValue: string }
>('auth/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    const res = await forgotPasswordApi(email);
    if (!res.success) {
      return rejectWithValue(res.message ?? 'Ошибка восстановления');
    }
    return res;
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message ?? 'Ошибка сети');
  }
});

// Thunk для сброса пароля
export const resetPassword = createAsyncThunk<
  IApiResponse,
  { password: string; token: string },
  { rejectValue: string }
>('auth/resetPassword', async (body, { rejectWithValue }) => {
  try {
    const res = await resetPasswordApi(body);
    if (!res.success) {
      return rejectWithValue(res.message ?? 'Ошибка сброса пароля');
    }
    return res;
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message ?? 'Ошибка сети');
  }
});

// Thunk для регистрации
export const register = createAsyncThunk<
  IAuthResponse,
  { email: string; password: string; name: string },
  { rejectValue: string }
>('auth/register', async (body, { rejectWithValue }) => {
  try {
    const res = await registerApi(body);
    if (!res.success) {
      return rejectWithValue(res.message ?? 'Ошибка регистрации');
    }
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message ?? 'Ошибка сети');
  }
});
export const login = createAsyncThunk<
  IAuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (body, { rejectWithValue }) => {
  try {
    const res = await loginApi(body);
    if (!res.success) {
      return rejectWithValue(res.message ?? 'Ошибка входа');
    }
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message ?? 'Ошибка сети');
  }
});

export const logout = createAsyncThunk<IApiResponse, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('refreshToken');
      if (!token) {
        return rejectWithValue('Нет refreshToken');
      }
      const res = await logoutApi(token);
      if (!res.success) {
        return rejectWithValue('Ошибка выхода');
      }
      localStorage.removeItem('refreshToken');
      return res;
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message ?? 'Ошибка сети');
    }
  }
);

export const refreshToken = createAsyncThunk<
  ITokenResponse,
  void,
  { rejectValue: string }
>('auth/refreshToken', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('refreshToken');
    if (!token) {
      return rejectWithValue('Нет refreshToken');
    }
    const res = await refreshTokenApi(token);
    if (!res.success) {
      return rejectWithValue('Ошибка обновления токена');
    }
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message ?? 'Ошибка сети');
  }
});

export const getUser = createAsyncThunk<
  { user: IUser },
  void,
  { rejectValue: string; state: { auth: AuthState } }
>('auth/getUser', async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user.accessToken;
    if (!token) {
      return rejectWithValue('Нет accessToken');
    }
    const res = await getUserApi(token);
    if (!res.success) {
      return rejectWithValue('Не удалось получить пользователя');
    }
    return { user: res.user };
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message ?? 'Ошибка сети');
  }
});

export const updateUser = createAsyncThunk<
  { user: IUser },
  { name?: string; email?: string; password?: string },
  { rejectValue: string; state: { auth: AuthState } }
>('auth/updateUser', async (body, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user.accessToken;
    console.log('updateUser - accessToken: токен актуален ' + (token ? 'да' : 'нет'));
    if (!token) {
      return rejectWithValue('Нет accessToken');
    }
    const res = await updateUserApi(token, body);
    if (!res.success) {
      return rejectWithValue('Не удалось обновить пользователя');
    }
    return { user: res.user };
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message ?? 'Ошибка сети');
  }
});
export const checkAuth = createAsyncThunk<void, void, { state: { auth: AuthState } }>(
  'auth/checkAuth',
  async (_, { dispatch }) => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (storedRefreshToken) {
        const refreshRes = await dispatch(refreshToken());
        if (refreshToken.fulfilled.match(refreshRes)) {
          await dispatch(getUser());
        } else {
          localStorage.removeItem('refreshToken');
        }
      }
    } catch (err: unknown) {
      localStorage.removeItem('refreshToken');
      console.error((err as Error).message ?? 'Ошибка сети');
    }
  }
);
