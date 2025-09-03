import { NavLink, Outlet, useLocation } from 'react-router';

import style from './profile.module.css';
export const Profile = (): React.JSX.Element => {
  const location = useLocation();
  const activeClass = 'text_color_inactive';

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
        <p className="text text_type_main-medium pt-4 pb-4 text_color_inactive">Выход</p>
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
