import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { DetailsIngredient } from '@/pages/details-ingredient/detail-ingredient';
import { DetailsOrders } from '@/pages/details-order/details-order';
import { Feed } from '@/pages/feed/feed';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { Login } from '@/pages/login/login';
import { NotFound } from '@/pages/not-found/not-found';
import { OrderModal } from '@/pages/order-modal/order-modal';
import { Orders } from '@/pages/orders/orders';
import { Profile } from '@/pages/profile/profile';
import { Register } from '@/pages/registration/register';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { checkAuth } from '@/services/auth/authThunk';
import { fetchIngredients, setIngredientDetails } from '@/services/ingredientsSlice';
import { fetchOrderDetails } from '@/services/purchase/purchaseThunk';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router';
import { ClipLoader } from 'react-spinners';

import ModalIngredients from '../burger-ingredients/burger-ingredients';
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
  const { isLoading, error, ingredients } = useAppSelector((store) => store.ingredients);
  const location = useLocation();
  const navigate = useNavigate();
  const orders = useAppSelector((store) => store.orders.orders);

  const background =
    (location.state as { background?: Location | null } | null)?.background ?? null;
  const IngredientModalContent = (): React.JSX.Element | null => {
    const { id } = useParams();
    const ingredient = ingredients.find((item) => item._id === id);
    return ingredient ? <ModalIngredients ingredient={ingredient} /> : null;
  };
  const OrderModalContent = (): React.JSX.Element | null => {
    const { number } = useParams();
    const orderNumber = number ? Number(number) : undefined;
    const order = orders.find((item) => item.number === orderNumber);
    useEffect(() => {
      if (orderNumber && orders.length && !order) {
        void dispatch(fetchOrderDetails(orderNumber));
      }
    }, [dispatch, order, orderNumber, orders.length]);
    return order ? (
      <OrderModal order={order}></OrderModal>
    ) : (
      <ClipLoader
        color="#4c4cff"
        size={150}
        aria-label={'Загрузка Spinner'}
        cssOverride={{ margin: 'auto auto' }}
      />
    );
  };
  const handleOrderModalClose = (): void => {
    void navigate(-1);
  };
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
  // const isProfileOrderModal =
  //   location.pathname.startsWith('/profile/orders/') && !background;
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
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route
            path="profile/orders/:number"
            element={<ProtectedRouteElement element={<DetailsOrders />} />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="ingredients/:id" element={<DetailsIngredient />} />
          <Route path="feed" element={<Feed />} />
          <Route path="feed/:number" element={<DetailsOrders />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleModalClose}>
                <IngredientModalContent />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal onClose={handleOrderModalClose}>
                <OrderModalContent />
              </Modal>
            }
          />
          {/* {isProfileOrderModal && ( */}
          <Route
            path="/profile/orders/:number"
            element={
              <Modal onClose={handleOrderModalClose}>
                <DetailsOrders />
                {/* <OrderModalContent /> */}
              </Modal>
            }
          />
          {/* )} */}
        </Routes>
      )}
    </div>
  );
};

export default App;
