import { useAppDispatch } from '@/hooks/hooks';
import { login } from '@/services/auth/authThunk';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const Login = (): React.JSX.Element => {
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!valueEmail || !valuePassword) {
      setError('Заполните все поля');
      return;
    }
    const resultAction = await dispatch(
      login({ email: valueEmail, password: valuePassword })
    );
    if (login.rejected.match(resultAction)) {
      setError('Ошибка при входе');
      return;
    }
    if (login.fulfilled.match(resultAction)) {
      void navigate('/');
    }
    // ): Promise<void> => {
    //   const res = await dispatch(login({ email: valueEmail, password: valuePassword }));
    //   if (login.fulfilled.match(res)) {
    //     void navigate('/');
    //   }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        margin: 'auto auto',
        alignItems: 'center',
      }}
    >
      <p className="text text_type_main-large">Вход</p>
      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
        style={{ display: 'contents' }}
      >
        <Input
          type={'email'}
          placeholder={'E-mail'}
          value={valueEmail}
          onChange={(e) => setValueEmail(e.target.value)}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          value={valuePassword}
          onChange={(e) => setValuePassword(e.target.value)}
          icon={'ShowIcon'}
        />
        {error && (
          <p className="text text_type_main-default text_color_error mt-2">{error}</p>
        )}
        <Button htmlType={'submit'} type={'primary'} size={'large'}>
          Войти
        </Button>
      </form>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          alignItems: 'center',
          marginTop: '80px',
        }}
      >
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
          <Button
            htmlType={'button'}
            type={'secondary'}
            size={'small'}
            extraClass="pl-2"
            onClick={() => void navigate('/register')}
          >
            Зарегистрироваться
          </Button>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Button
            htmlType={'button'}
            type={'secondary'}
            size={'small'}
            extraClass="pl-2"
            onClick={() => void navigate('/forgot-password')}
          >
            Восстановить пароль
          </Button>
        </p>
      </div>
    </div>
  );
};
