import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { Login } from '@/pages/login/login';
import { NotFound } from '@/pages/not-found/not-found';
// import { Orders } from '@/pages/orders/orders';
import { Profile } from '@/pages/profile/profile';
import { Register } from '@/pages/registration/register';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { checkAuth } from '@/services/auth/authThunk';
import { fetchIngredients } from '@/services/ingredientsSlice';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';

import {
  ProtectedRouteElement,
  ResetPasswordProtectedRoute,
  UnprotectedRouteElement,
} from '../protected-route/protected-route';
import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';
export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((store) => store.ingredients);
  useEffect(() => {
    void dispatch(checkAuth());
    void dispatch(fetchIngredients());
  }, [dispatch]);

  if (error) {
    return <div>{error}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<AppHeader />}>
          <Route index element={<Home />} />
          <Route
            path="register"
            element={<UnprotectedRouteElement element={<Register />} />}
          />
          <Route
            path="login"
            element={<UnprotectedRouteElement element={<Login />} />}
          />
          <Route
            path="forgot-password"
            element={<UnprotectedRouteElement element={<ForgotPassword />} />}
          />
          <Route
            path="reset-password"
            element={<ResetPasswordProtectedRoute element={<ResetPassword />} />}
          />
          <Route
            path="profile"
            element={<ProtectedRouteElement element={<Profile />} />}
          />
          <Route
            path="profile/*"
            element={<ProtectedRouteElement element={<Profile />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
