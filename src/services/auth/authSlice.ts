import { createSlice } from '@reduxjs/toolkit';

import {
  register,
  login,
  logout,
  refreshToken,
  getUser,
  updateUser,
  checkAuth,
  forgotPassword,
} from './authThunk';

import type { AuthState } from '../types/types';

const initialState: AuthState = {
  user: {
    data: null,
    accessToken: null,
    isAuthChecked: false,
    isLoading: false,
    error: null,
  },
  forgot: {
    email: null,
    isLoading: false,
    error: null,
  },
  reset: {
    isLoading: false,
    error: null,
    message: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.user.isLoading = true;
        state.user.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user.data = action.payload.user;
        state.user.accessToken = action.payload.accessToken;
        state.user.isAuthChecked = true;
        state.user.isLoading = false;
        state.user.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.user.error = action.payload ?? 'Ошибка регистрации';
        state.user.isAuthChecked = true;
        state.user.isLoading = false;
      })

      // login
      .addCase(login.pending, (state) => {
        state.user.isLoading = true;
        state.user.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user.data = action.payload.user;
        state.user.accessToken = action.payload.accessToken;
        state.user.isAuthChecked = true;
        state.user.isLoading = false;
        state.user.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user.error = action.payload ?? 'Ошибка входа';
        state.user.isAuthChecked = true;
        state.user.isLoading = false;
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.user.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user.data = null;
        state.user.accessToken = null;
        state.user.isAuthChecked = true;
        state.user.isLoading = false;
        state.user.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.user.isLoading = false;
        state.user.error = action.payload ?? 'Ошибка выхода';
      })

      // refreshToken
      .addCase(refreshToken.pending, (state) => {
        state.user.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user.accessToken = action.payload.accessToken;
        state.user.isAuthChecked = true;
        state.user.isLoading = false;
        state.user.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.user.accessToken = null;
        state.user.error = action.payload ?? 'Ошибка обновления токена';
        state.user.isAuthChecked = true;
        state.user.isLoading = false;
      })

      // getUser
      .addCase(getUser.pending, (state) => {
        state.user.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user.data = action.payload.user;
        state.user.isAuthChecked = true;
        state.user.isLoading = false;
        state.user.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user.isAuthChecked = true;
        state.user.isLoading = false;
        state.user.error = action.payload ?? 'Ошибка получения данных пользователя';
        state.user.data = null;
        state.user.accessToken = null;
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.user.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user.data = action.payload.user;
        state.user.isLoading = false;
        state.user.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.user.isLoading = false;
        state.user.error = action.payload ?? 'Ошибка обновления данных пользователя';
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.user.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user.isAuthChecked = true;
      })
      // forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.forgot.isLoading = true;
        state.forgot.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgot.email = action.meta.arg;
        state.forgot.isLoading = false;
        state.forgot.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgot.error = action.payload ?? 'Ошибка запроса на восстановление пароля';
        state.forgot.isLoading = false;
      });
    // checkUser
    // .addCase(checkUser.fulfilled, (state) => {
  },
});

export default authSlice.reducer;
