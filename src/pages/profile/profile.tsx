import { Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';

export const Profile = (): React.JSX.Element => {
  const [valueText, setValueText] = useState('');
  const [valueLogin, setValueLogin] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '60px',
        margin: 'auto auto',
      }}
    >
      <div className="flex flex-col" style={{ maxWidth: '320px' }}>
        <p className="text text_type_main-medium pt-4 pb-4">Профиль</p>
        <NavLink
          to="/profile/orders"
          className="text text_type_main-medium pt-4 pb-4 text_color_inactive"
        >
          История заказов
        </NavLink>
        <p className="text text_type_main-medium pt-4 pb-4 text_color_inactive">Выход</p>
        <p className="text text_type_main-default text_color_inactive mt-20">
          в этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          value={valueText}
          onChange={(e) => setValueText(e.target.value)}
          icon={'EditIcon'}
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          value={valueLogin}
          onChange={(e) => setValueLogin(e.target.value)}
          icon={'EditIcon'}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          value={valuePassword}
          onChange={(e) => setValuePassword(e.target.value)}
          icon={'EditIcon'}
        />
      </div>
      <Outlet />
    </div>
  );
};
