import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { updateUser } from '@/services/auth/authThunk';
import { Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

export const ProfileDetails = (): React.JSX.Element => {
  const { user } = useAppSelector((store) => store.auth);
  const [valueText, setValueText] = useState('');
  const [valueLogin, setValueLogin] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user?.data) {
      setValueText(user.data.name ?? '');
      setValueLogin(user.data.email ?? '');
    }
  }, [user]);

  const handleSave = async (e?: React.FocusEvent<HTMLInputElement>): Promise<void> => {
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
    <>
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
    </>
  );
};
