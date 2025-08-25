import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const Login = (): React.JSX.Element => {
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const navigate = useNavigate();
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
      <Button htmlType={'button'} type={'primary'} size={'large'}>
        Войти
      </Button>
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
