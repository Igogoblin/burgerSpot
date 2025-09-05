import { useAppDispatch } from '@/hooks/hooks';
import { logout } from '@/services/auth/authThunk';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';

import style from './profile.module.css';
export const Profile = (): React.JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeClass = 'text_color_inactive';

  const handleLogout = async (): Promise<void> => {
    try {
      await dispatch(logout());
      void navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.container_profile}>
        <NavLink
          to="/profile"
          className={`text text_type_main-medium pt-4 pb-4 ${location.pathname === '/profile' ? '' : activeClass}`}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`text text_type_main-medium pt-4 pb-4 ${location.pathname === '/profile/orders' ? '' : activeClass}`}
        >
          История заказов
        </NavLink>
        <button
          className={style.logout}
          // className="text text_type_main-medium pt-4 pb-4 text_color_inactive cursor-pointer"
          onClick={() => void handleLogout()}
        >
          Выход
        </button>
        <p className="text text_type_main-default text_color_inactive mt-20">
          в этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={style.profile}>
        <Outlet />
      </div>
    </div>
  );
};
