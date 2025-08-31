import { NavLink, Outlet, useLocation } from 'react-router';

export const Profile = (): React.JSX.Element => {
  const location = useLocation();
  const activeClass = 'text_color_inactive';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        gap: '60px',
        maxWidth: '1240px',
        width: '100%',
        margin: 'auto auto',
        padding: '16px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '320px' }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Outlet />
      </div>
    </div>
  );
};
