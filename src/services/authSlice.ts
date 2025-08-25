// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import { request } from './utils/request';

// import type { AuthState, IApiResponse, ITokenResponse, IUser } from './types/types';

// const initialState: AuthState = {
//   forgot: {
//     email: null,
//     isLoading: false,
//     error: null,
//   },
//   reset: {
//     isLoading: false,
//     error: null,
//     message: null,
//   },
//   user: {
//     data: null,
//     accessToken: null,
//     isAuthChecked: false,
//     isLoading: false,
//     error: null,
//   },
// };

// export const forgotPassword = createAsyncThunk<
//   IApiResponse,
//   string,
//   { rejectValue: string }
// >('auth/forgotPassword', async (email, { rejectWithValue }) => {
//   try {
//     const res = await request<IApiResponse>('/password-reset', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email }),
//     });
//     if (!res.success) {
//       return rejectWithValue(res.message ?? 'Ошибка восстановления');
//     }
//     return res;
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return rejectWithValue(err.message ?? 'Ошибка сети');
//     }
//     return rejectWithValue('Ошибка сети');
//   }
// });

// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async (
//     { password, token }: { password: string; token: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await request<IApiResponse>('/password-reset/reset', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ password, token }),
//       });
//       // Проверяем, что ответ успешный
//       if (!res.success) {
//         return rejectWithValue(res.message ?? 'Ошибка сброса пароля');
//       }
//       return res;
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         return rejectWithValue(err.message ?? 'Ошибка сети');
//       }
//       return rejectWithValue('Ошибка сети');
//     }
//   }
// );
// export const login = createAsyncThunk<
//   IApiResponse,
//   { email: string; password: string },
//   { rejectValue: string }
// >('auth/login', async (body, { rejectWithValue }) => {
//   try {
//     const res = await request<IApiResponse>('/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(body),
//     });
//     if (!res.success) return rejectWithValue(res.message ?? 'Ошибка входа');
//     localStorage.setItem('refreshToken', String(res.refreshToken));
//     return res;
//   } catch (err: unknown) {
//     if (err instanceof Error) return rejectWithValue(err.message);
//     return rejectWithValue('Ошибка сети');
//   }
// });

// // register
// export const register = createAsyncThunk<
//   IApiResponse,
//   { email: string; password: string; name: string },
//   { rejectValue: string }
// >('auth/register', async (body, { rejectWithValue }) => {
//   try {
//     const res = await request<IApiResponse>('/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(body),
//     });
//     if (!res.success) return rejectWithValue(res.message ?? 'Ошибка регистрации');
//     localStorage.setItem('refreshToken',  String(res.refreshToken));
//     return res;
//   } catch (err: unknown) {
//     if (err instanceof Error) return rejectWithValue(err.message);
//     return rejectWithValue('Ошибка сети');
//   }
// });

// // refreshToken
// export const refreshToken = createAsyncThunk<
//   ITokenResponse,
//   void,
//   { rejectValue: string }
// >('auth/refreshToken', async (_, { rejectWithValue }) => {
//   try {
//     const token = localStorage.getItem('refreshToken');
//     if (!token) return rejectWithValue('Нет refreshToken');
//     const res = await request<ITokenResponse>('/auth/token', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token }),
//     });
//     if (!res.success) return rejectWithValue('Ошибка обновления токена');
//     localStorage.setItem('refreshToken', res.refreshToken);
//     return res;
//   } catch {
//     return rejectWithValue('Ошибка сети');
//   }
// });

// // getUser
// export const getUser = createAsyncThunk<
//   { user: IUser },
//   void,
//   { rejectValue: string; state: { auth: AuthState } }
// >('auth/getUser', async (_, { rejectWithValue, getState }) => {
//   try {
//     const token = getState().auth.user.accessToken;
//     if (!token) return rejectWithValue('Нет accessToken');
//     const res = await request<{ success: boolean; user: IUser }>('/auth/user', {
//       method: 'GET',
//       headers: { Authorization: token },
//     });
//     if (!res.success) return rejectWithValue('Не удалось получить пользователя');
//     return { user: res.user };
//   } catch {
//     return rejectWithValue('Ошибка сети');
//   }
// });

// // logout
// export const logout = createAsyncThunk<IApiResponse, void, { rejectValue: string }>(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('refreshToken');
//       const res = await request<IApiResponse>('/auth/logout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token }),
//       });
//       if (!res.success) return rejectWithValue('Ошибка выхода');
//       localStorage.removeItem('refreshToken');
//       return res;
//     } catch {
//       return rejectWithValue('Ошибка сети');
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     clearAuthState(state) {
//       state.forgot.error = null;
//       state.forgot.isLoading = false;
//     },
//     clearResetState(state) {
//       state.reset.error = null;
//       state.reset.isLoading = false;
//       state.reset.message = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//     // login
//       .addCase(login.fulfilled, (state, action) => {
//         state.user.data = action.payload.user;
//         state.user.accessToken = action.payload.accessToken;
//         state.user.isAuthChecked = true;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.user.error = action.payload ?? 'Ошибка входа';
//         state.user.isAuthChecked = true;
//       })

//       // register
//       .addCase(register.fulfilled, (state, action) => {
//         state.user.data = action.payload.user;
//         state.user.accessToken = action.payload.accessToken;
//         state.user.isAuthChecked = true;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.user.error = action.payload ?? 'Ошибка регистрации';
//         state.user.isAuthChecked = true;
//       })

//       // refreshToken
//       .addCase(refreshToken.fulfilled, (state, action) => {
//         state.user.accessToken = action.payload.accessToken;
//       })

//       // getUser
//       .addCase(getUser.fulfilled, (state, action) => {
//         state.user.data = action.payload.user;
//         state.user.isAuthChecked = true;
//       })
//       .addCase(getUser.rejected, (state) => {
//         state.user.isAuthChecked = true;
//       })

//       // logout
//       .addCase(logout.fulfilled, (state) => {
//         state.user.data = null;
//         state.user.accessToken = null;
//         state.user.isAuthChecked = false;
//       });
//       .addCase(forgotPassword.pending, (state) => {
//         state.forgot.isLoading = true;
//         state.forgot.error = null;
//       })
//       .addCase(forgotPassword.fulfilled, (state, action) => {
//         state.forgot.isLoading = false;
//         state.forgot.email = action.meta.arg; // сохраняем введённый email
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.forgot.isLoading = false;
//         state.forgot.error = action.payload || 'Не удалось отправить запрос';
//       })
//       .addCase(resetPassword.pending, (state) => {
//         state.reset.isLoading = true;
//         state.reset.error = null;
//         state.reset.message = null; // очищаем сообщение об ошибке
//       })
//       .addCase(resetPassword.fulfilled, (state) => {
//         state.reset.isLoading = false;
//         state.forgot.email = null; // очищаем email после успешного сброса пароля
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.reset.isLoading = false;
//         state.reset.error =
//           typeof action.payload === 'string'
//             ? action.payload
//             : 'Не удалось сбросить пароль';
//       });
//   },
// });

// export const { clearAuthState, clearResetState } = authSlice.actions;
// export default authSlice;
