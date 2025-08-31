import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { DetailsIngredient } from '@/pages/details-ingredient/detail-ingredient';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { Login } from '@/pages/login/login';
import { NotFound } from '@/pages/not-found/not-found';
import { OrderHistory } from '@/pages/order-history/order-history';
// import { Orders } from '@/pages/orders/orders';
import { Profile } from '@/pages/profile/profile';
import { Register } from '@/pages/registration/register';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { checkAuth } from '@/services/auth/authThunk';
import { fetchIngredients, setIngredientDetails } from '@/services/ingredientsSlice';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';

import ModalIngredients from '../burger-ingredients/burger-ingredients';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import { ProfileDetails } from '../profile-details/profile-details';
import {
  ProtectedRouteElement,
  ResetPasswordProtectedRoute,
  UnprotectedRouteElement,
} from '../protected-route/protected-route';
import { AppHeader } from '@components/app-header/app-header';

import type { Location } from 'react-router';

import styles from './app.module.css';
export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLoading, error, ingredient } = useAppSelector((store) => store.ingredients);
  const location = useLocation();
  const navigate = useNavigate();

  const background: Location | null =
    (location.state as { background?: Location } | null)?.background ?? null;
  useEffect(() => {
    void dispatch(checkAuth());
    void dispatch(fetchIngredients());
  }, [dispatch]);

  const handleModalClose = (): void => {
    dispatch(setIngredientDetails(null));
    void navigate('/');
  };

  if (error) {
    return <div>{error}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <Routes location={background ?? location}>
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
          >
            <Route index element={<ProfileDetails />} />
            <Route path="orders" element={<OrderHistory />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="ingredients/:id" element={<DetailsIngredient />} />
        </Route>
      </Routes>
      {background && ingredient && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <>
                <Modal onClose={handleModalClose}>
                  <ModalIngredients ingredient={ingredient} />
                </Modal>
                <ModalOverlay onClose={handleModalClose} />
              </>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
