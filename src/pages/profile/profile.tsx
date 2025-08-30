import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { updateUser } from '@/services/auth/authThunk';
import { Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router';

import type { FocusEvent, MouseEvent } from 'react';

export const Profile = (): React.JSX.Element => {
  const { user } = useAppSelector((store) => store.auth);
  const [valueText, setValueText] = useState('');
  const [valueLogin, setValueLogin] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    if (user?.data) {
      setValueText(user.data.name ?? '');
      setValueLogin(user.data.email ?? '');
    }
  }, [user]);

  const handleSave = async (
    e:
      | MouseEvent<HTMLDivElement, MouseEvent>
      | FocusEvent<HTMLInputElement, Element>
      | undefined
  ): Promise<void> => {
    if (e) {
      e.preventDefault();
    }
    const res = await dispatch(
      updateUser({
        name: valueText,
        email: valueLogin,
        password: valuePassword,
      })
    );
    if (updateUser.fulfilled.match(res)) {
      console.log('Профиль обновлен:', res.payload.user);
      setValuePassword('');
    }
  };

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
        <p
          className="text text_type_main-medium pt-4 pb-4 text_color_inactive"
          // onClick={() => handleSubmit}
        >
          Выход
        </p>
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
          // onIconClick={() => void handleSave()}
          onBlur={(e) => {
            void handleSave(e);
          }}
          icon={'EditIcon'}
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          value={valueLogin}
          onChange={(e) => setValueLogin(e.target.value)}
          // onIconClick={(e) => void handleSave(e)}
          onBlur={(e) => {
            void handleSave(e);
          }}
          icon={'EditIcon'}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          value={valuePassword}
          onChange={(e) => setValuePassword(e.target.value)}
          icon={'EditIcon'}
          // onIconClick={(e) => void handleSave(e)}
          onBlur={(e) => {
            void handleSave(e);
          }}
          title="изменить пароль"
        />
      </div>
      <Outlet />
    </div>
  );
};
